from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
import os
import aiosmtplib
from email.message import EmailMessage
import logging
import uuid

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/inquiries", tags=["inquiries"])


class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""
    service: Optional[str] = ""
    message: str


async def send_inquiry_email(inquiry: InquiryCreate):
    smtp_host = os.environ.get("SMTP_HOST")
    if not smtp_host:
        logger.warning("SMTP_HOST not set, skipping email send")
        return

    smtp_port = int(os.environ.get("SMTP_PORT", 587))
    smtp_user = os.environ.get("SMTP_USERNAME")
    smtp_pass = os.environ.get("SMTP_PASSWORD")
    smtp_from = os.environ.get("SMTP_FROM_EMAIL", smtp_user)
    smtp_to = os.environ.get("SMTP_TO_EMAIL")

    if not all([smtp_user, smtp_pass, smtp_to]):
        logger.warning("SMTP configuration incomplete, skipping email send")
        return

    msg = EmailMessage()
    msg["From"] = smtp_from
    msg["To"] = smtp_to
    msg["Subject"] = f"New Inquiry from {inquiry.name} ({inquiry.company or 'No Company'})"
    
    content = f"""New Inquiry Details:
--------------------
Name: {inquiry.name}
Email: {inquiry.email}
Phone: {inquiry.phone}
Company: {inquiry.company}
Service of Interest: {inquiry.service}

Project Details / Message:
{inquiry.message}
"""
    msg.set_content(content)

    try:
        await aiosmtplib.send(
            msg,
            hostname=smtp_host,
            port=smtp_port,
            username=smtp_user,
            password=smtp_pass,
            start_tls=True if smtp_port == 587 else False,
            use_tls=True if smtp_port == 465 else False,
        )
        logger.info(f"Email sent successfully for inquiry from {inquiry.email}")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")


@router.post("")
async def create_inquiry(payload: InquiryCreate, background_tasks: BackgroundTasks):
    from server import db
    
    doc = payload.dict()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.utcnow()
    
    try:
        await db.inquiries.insert_one(doc)
    except Exception as e:
        logger.error(f"Failed to save inquiry to database: {e}")
        # We don't want to fail the request if just the DB fails, 
        # or maybe we do, but sending the email is more important.
        pass

    # Send email in background so the client gets a fast response
    background_tasks.add_task(send_inquiry_email, payload)
    
    return {"status": "success", "message": "Inquiry received"}
