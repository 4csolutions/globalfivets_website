// Mock data for Global Five Trading and Services LLC

export const companyInfo = {
  name: "Global Five Trading and Services LLC",
  shortName: "Global Five",
  tagline: "Specialized in Water, Wastewater, and Telecom Infrastructure",
  founded: 2014,
  country: "Sultanate of Oman",
  description:
    "Global Five Trading and Services LLC is a leading Omani contracting and trading firm delivering integrated infrastructure solutions across the Sultanate. From municipal water networks to advanced telecommunication systems, we engineer reliable systems that power communities and industries.",
  cr: "CR No. 1247389",
  vat: "VAT: OM1100231425",
};

export const contact = {
  address: "Building 121, Way No. 4503, Al Khuwair, Muscat, Sultanate of Oman",
  poBox: "P.O. Box 482, Postal Code 118, Al Harthy Complex",
  phone: "+968 2449 8120",
  mobile: "+968 9123 4567",
  email: "info@globalfivets.com",
  sales: "sales@globalfivets.com",
  hours: "Sun – Thu: 8:00 AM – 5:00 PM",
};

export const stats = [
  { value: "11+", label: "Years of Experience" },
  { value: "180+", label: "Projects Delivered" },
  { value: "45+", label: "Skilled Engineers" },
  { value: "24/7", label: "Operational Support" },
];

export const services = [
  {
    id: "water",
    title: "Water Solutions",
    icon: "Droplets",
    short: "End-to-end potable water network design, supply, and maintenance.",
    description:
      "From source intake to distribution, we deliver complete water infrastructure including pumping stations, reservoirs, transmission mains, and SCADA-controlled distribution networks engineered to PAEW and OWWSC standards.",
    image:
      "https://images.unsplash.com/photo-1533077162801-86490c593afb?crop=entropy&cs=srgb&fm=jpg&q=85",
    capabilities: [
      "Potable water transmission & distribution networks",
      "Pumping stations and ground/elevated reservoirs",
      "Reverse osmosis & desalination integration",
      "Leak detection, valve chambers & meter installation",
      "SCADA, telemetry & remote monitoring",
    ],
  },
  {
    id: "wastewater",
    title: "Wastewater Management",
    icon: "Recycle",
    short: "Sewerage networks and treatment systems built for arid environments.",
    description:
      "We design, install and commission sewer collection systems, lift stations and tertiary treatment plants — fully aligned with Haya Water and Be'ah environmental specifications across Oman.",
    image:
      "https://images.unsplash.com/photo-1774789599304-cca1e1ffbb95?crop=entropy&cs=srgb&fm=jpg&q=85",
    capabilities: [
      "Gravity sewer & rising-main pipelines",
      "Sewage pumping stations (SPS) turnkey",
      "Membrane bio-reactor (MBR) & SBR plants",
      "Sludge handling & odour control units",
      "Treated effluent (TSE) reuse networks",
    ],
  },
  {
    id: "telecom",
    title: "Telecom Services",
    icon: "RadioTower",
    short: "Civil, OSP and FTTH rollout for Oman's leading operators.",
    description:
      "Approved vendor for Omantel, Ooredoo and Awasr — we deliver fibre-to-the-home, microwave tower civils, duct & manhole networks, and active network commissioning across the Sultanate.",
    image:
      "https://images.unsplash.com/photo-1643155193188-38eb08e2b54f?crop=entropy&cs=srgb&fm=jpg&q=85",
    capabilities: [
      "FTTH/FTTx civil and splicing works",
      "GSM/4G/5G tower civil & installation",
      "Backbone duct, sub-duct & manhole construction",
      "OFC blowing, jointing & OTDR testing",
      "Last-mile activation and customer drops",
    ],
  },
  {
    id: "mechanical",
    title: "Mechanical Systems",
    icon: "Settings",
    short: "HVAC, plumbing and industrial mechanical packages.",
    description:
      "Complete mechanical contracting capabilities covering HVAC, firefighting, plumbing and industrial process piping — executed by certified welders and ASME-compliant teams.",
    image:
      "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=srgb&fm=jpg&q=85",
    capabilities: [
      "Chilled water & VRF HVAC systems",
      "Firefighting (NFPA-13) and FM-200 systems",
      "Process piping, GRP & HDPE installation",
      "Pump skids, valve assemblies & calibration",
      "Preventive & shutdown maintenance contracts",
    ],
  },
  {
    id: "electrical",
    title: "Electrical & Instrumentation",
    icon: "Zap",
    short: "LV/MV power systems and process instrumentation.",
    description:
      "Authority-approved electrical contracting works including substations, LV/MV switchgear, cable laying, lighting, earthing, and full instrumentation & control loops.",
    image:
      "https://images.unsplash.com/photo-1620203853151-496c7228306c?crop=entropy&cs=srgb&fm=jpg&q=85",
    capabilities: [
      "11kV / 33kV substation works",
      "LV/MV switchgear & MCC panels",
      "Cable trays, glanding & terminations",
      "PLC, RTU and SCADA integration",
      "Field instrumentation calibration & loop checks",
    ],
  },
  {
    id: "trading",
    title: "Industrial Trading",
    icon: "PackageCheck",
    short: "Trusted supplier of pipes, fittings, pumps and instrumentation.",
    description:
      "Authorised distributor for leading European and GCC manufacturers — delivering material at site on time, complete with mill certificates and full traceability.",
    image:
      "https://images.unsplash.com/photo-1542274368-443d694d79aa?crop=entropy&cs=srgb&fm=jpg&q=85",
    capabilities: [
      "Ductile iron, HDPE & GRP pipes",
      "Centrifugal & submersible pumps",
      "Valves, actuators & flow meters",
      "Electrical cables & switchgear",
      "Tools, PPE & site consumables",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Barka Potable Water Network Extension",
    category: "Water",
    client: "Nama Water Services",
    year: 2026,
    location: "Al Batinah South, Oman",
    image:
      "https://images.unsplash.com/photo-1533077162801-86490c593afb?crop=entropy&cs=srgb&fm=jpg&q=85",
    summary:
      "Design and construction of 42 km of DI transmission mains, two booster stations and 6,000 m³ ground reservoir serving 28,000 residents.",
  },
  {
    id: 2,
    title: "Sohar Industrial STP Upgrade",
    category: "Wastewater",
    client: "Sohar Port & Freezone",
    year: 2025,
    location: "Sohar, Oman",
    image:
      "https://images.unsplash.com/photo-1774789599304-cca1e1ffbb95?crop=entropy&cs=srgb&fm=jpg&q=85",
    summary:
      "Capacity upgrade of existing STP from 4 MLD to 9 MLD using MBR technology with TSE reuse for industrial cooling.",
  },
  {
    id: 3,
    title: "Muscat FTTH Rollout — Phase 4",
    category: "Telecom",
    client: "Omantel",
    year: 2026,
    location: "Bawshar & Seeb, Muscat",
    image:
      "https://images.unsplash.com/photo-1557174360-3f4f7c724501?crop=entropy&cs=srgb&fm=jpg&q=85",
    summary:
      "Civil and OSP works for 18,500 home-passes including duct laying, manhole construction, OFC blowing and customer activations.",
  },
  {
    id: 4,
    title: "Duqm Refinery Firewater Network",
    category: "Mechanical",
    client: "OQ Refineries",
    year: 2024,
    location: "Duqm SEZ, Oman",
    image:
      "https://images.unsplash.com/photo-1717386255773-1e3037c81788?crop=entropy&cs=srgb&fm=jpg&q=85",
    summary:
      "Supply, install and commissioning of NFPA-13 firefighting loop, two diesel-driven pump skids and deluge valve stations.",
  },
  {
    id: 5,
    title: "Salalah Tower Civils — 38 Sites",
    category: "Telecom",
    client: "Ooredoo Oman",
    year: 2025,
    location: "Dhofar Governorate, Oman",
    image:
      "https://images.unsplash.com/photo-1533664488202-6af66d26c44a?crop=entropy&cs=srgb&fm=jpg&q=85",
    summary:
      "Greenfield civil works for 38 GSM/4G sites including foundations, fencing, shelter installation and grid power tie-in.",
  },
  {
    id: 6,
    title: "Nizwa Sewerage Catchment Phase II",
    category: "Wastewater",
    client: "Nama Water Services",
    year: 2024,
    location: "Nizwa, Ad Dakhiliyah",
    image:
      "https://images.unsplash.com/photo-1714901423336-1884cd3fb50f?crop=entropy&cs=srgb&fm=jpg&q=85",
    summary:
      "32 km gravity sewer network, 4 SPS stations and 1,800 house connections delivered ahead of schedule.",
  },
  {
    id: 7,
    title: "Al Mouj Marina Substation Works",
    category: "Electrical",
    client: "Al Mouj Muscat",
    year: 2026,
    location: "Seeb, Muscat",
    image:
      "https://images.unsplash.com/photo-1547895749-888a559fc2a7?crop=entropy&cs=srgb&fm=jpg&q=85",
    summary:
      "33/11 kV substation civil and E&I package including switchgear installation, cable termination and protection testing.",
  },
  {
    id: 8,
    title: "Ibri Solar Plant Pipeline Package",
    category: "Mechanical",
    client: "PDO / ACWA Power",
    year: 2025,
    location: "Ibri, Ad Dhahirah",
    image:
      "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=srgb&fm=jpg&q=85",
    summary:
      "Process and utility piping for the panel-washing water network with HDPE mains and skid-mounted pumping units.",
  },
];

export const values = [
  {
    title: "Engineering Excellence",
    description:
      "Every project is delivered by certified engineers using ISO 9001 quality processes and authority-approved methodologies.",
    icon: "Award",
  },
  {
    title: "Local Expertise",
    description:
      "Born and built in Oman — we understand the terrain, the climate, the regulators and the people we serve.",
    icon: "MapPin",
  },
  {
    title: "Safety First",
    description:
      "Zero-harm culture with OSHAD-compliant HSE plans, daily toolbox talks and a perfect LTI track record in 2025.",
    icon: "ShieldCheck",
  },
  {
    title: "On-Time Delivery",
    description:
      "Disciplined project management, transparent reporting and a proven supply chain keep us ahead of schedule.",
    icon: "Clock",
  },
];

export const clients = [
  "Nama Water Services",
  "Omantel",
  "Ooredoo Oman",
  "Awasr",
  "OQ Refineries",
  "Sohar Port",
  "PDO",
  "ACWA Power",
  "Al Mouj Muscat",
  "Be'ah",
];

export const certifications = [
  "ISO 9001:2015 — Quality Management",
  "ISO 14001:2015 — Environment",
  "ISO 45001:2018 — Occupational H&S",
  "Omantel Approved Vendor — Civil & OSP",
  "Nama Water Services Grade A Contractor",
  "OPAL Member — Oman Society for Petroleum Services",
];

export const team = [
  {
    name: "Eng. Khalid Al Hinai",
    role: "Managing Director",
    bio: "22 years in Omani infrastructure delivery. Former lead engineer at PDO.",
  },
  {
    name: "Eng. Sara Al Lawati",
    role: "Operations Director",
    bio: "Civil engineer specialising in turnkey water and wastewater projects.",
  },
  {
    name: "Eng. Rajeev Menon",
    role: "Telecom Division Head",
    bio: "Led nationwide FTTH programmes for two Tier-1 Omani operators.",
  },
  {
    name: "Eng. Fatma Al Balushi",
    role: "HSE & QA/QC Manager",
    bio: "NEBOSH IGC certified, drives our zero-harm and ISO compliance agenda.",
  },
];

export const testimonials = [
  {
    quote:
      "Global Five delivered our Barka water network ahead of schedule and well within budget. Their site team is among the most disciplined I've worked with in Oman.",
    author: "Project Director",
    company: "Nama Water Services",
  },
  {
    quote:
      "Reliable, responsive, and technically sound. Their FTTH rollout quality in Muscat consistently exceeds our KPIs.",
    author: "Network Deployment Manager",
    company: "Omantel",
  },
  {
    quote:
      "The Sohar STP upgrade was a complex brownfield job. Global Five handled it without a single day of operational downtime.",
    author: "Plant Operations Lead",
    company: "Sohar Port & Freezone",
  },
];
