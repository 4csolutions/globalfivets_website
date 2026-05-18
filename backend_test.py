#!/usr/bin/env python3
"""
Comprehensive backend API tests for Global Five TS
Tests auth, projects, users, and uploads endpoints
"""
import requests
import json
import io
from PIL import Image

# Base URL from frontend/.env
BASE_URL = "https://global-five-ts.preview.emergentagent.com/api"

# Default admin credentials (seeded on startup)
ADMIN_EMAIL = "admin@globalfivets.com"
ADMIN_PASSWORD = "Admin@12345"

# Test state
admin_token = None
editor_token = None
editor_user_id = None
test_project_id = None


def print_test(name):
    """Print test name"""
    print(f"\n{'='*80}")
    print(f"TEST: {name}")
    print('='*80)


def print_result(passed, message, response=None):
    """Print test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")
    if response and not passed:
        print(f"  Status: {response.status_code}")
        print(f"  Body: {response.text[:500]}")
    return passed


def test_auth_login_success():
    """Test 1: POST /api/auth/login with valid admin credentials"""
    global admin_token
    print_test("Auth - Login with valid admin credentials")
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        data = response.json()
        if "access_token" not in data:
            return print_result(False, "Missing access_token in response", response)
        
        if "user" not in data:
            return print_result(False, "Missing user in response", response)
        
        user = data["user"]
        if user.get("role") != "super_admin":
            return print_result(False, f"Expected role=super_admin, got {user.get('role')}", response)
        
        admin_token = data["access_token"]
        return print_result(True, f"Login successful, token received, role={user.get('role')}")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_auth_login_bad_password():
    """Test 2: POST /api/auth/login with bad password"""
    print_test("Auth - Login with bad password")
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": "WrongPassword123"},
            timeout=10
        )
        
        if response.status_code != 401:
            return print_result(False, f"Expected 401, got {response.status_code}", response)
        
        return print_result(True, "Correctly rejected bad password with 401")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_auth_me_without_token():
    """Test 3: GET /api/auth/me without token"""
    print_test("Auth - GET /me without token")
    
    try:
        response = requests.get(f"{BASE_URL}/auth/me", timeout=10)
        
        if response.status_code != 401:
            return print_result(False, f"Expected 401, got {response.status_code}", response)
        
        return print_result(True, "Correctly rejected request without token with 401")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_auth_me_with_token():
    """Test 4: GET /api/auth/me with valid token"""
    print_test("Auth - GET /me with valid token")
    
    if not admin_token:
        return print_result(False, "No admin token available (previous test failed)")
    
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        user = response.json()
        if user.get("role") != "super_admin":
            return print_result(False, f"Expected role=super_admin, got {user.get('role')}", response)
        
        return print_result(True, f"Successfully retrieved user: {user.get('email')}")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_public_list():
    """Test 5: GET /api/projects (no auth) - should return 11 published projects"""
    print_test("Projects - Public list (no auth)")
    
    try:
        response = requests.get(f"{BASE_URL}/projects", timeout=10)
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        projects = response.json()
        if not isinstance(projects, list):
            return print_result(False, "Response is not a list", response)
        
        # Should have 11 seeded projects
        count = len(projects)
        if count != 11:
            return print_result(False, f"Expected 11 projects, got {count}", response)
        
        return print_result(True, f"Retrieved {count} published projects")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_filter_by_category_water():
    """Test 6: GET /api/projects?category=Water - should return 4 Water projects"""
    print_test("Projects - Filter by category=Water")
    
    try:
        response = requests.get(f"{BASE_URL}/projects?category=Water", timeout=10)
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        projects = response.json()
        count = len(projects)
        
        # Verify all are Water category
        non_water = [p for p in projects if p.get("category") != "Water"]
        if non_water:
            return print_result(False, f"Found {len(non_water)} non-Water projects in results", response)
        
        if count != 4:
            return print_result(False, f"Expected 4 Water projects, got {count}", response)
        
        return print_result(True, f"Retrieved {count} Water projects")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_filter_telecom_limit():
    """Test 7: GET /api/projects?category=Telecom&limit=2"""
    print_test("Projects - Filter by category=Telecom with limit=2")
    
    try:
        response = requests.get(f"{BASE_URL}/projects?category=Telecom&limit=2", timeout=10)
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        projects = response.json()
        count = len(projects)
        
        if count != 2:
            return print_result(False, f"Expected 2 projects, got {count}", response)
        
        # Verify all are Telecom
        non_telecom = [p for p in projects if p.get("category") != "Telecom"]
        if non_telecom:
            return print_result(False, f"Found non-Telecom projects in results", response)
        
        return print_result(True, f"Retrieved {count} Telecom projects (limit applied)")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_get_single():
    """Test 8: GET /api/projects/{id} - get single project"""
    print_test("Projects - Get single project by ID")
    
    try:
        # First get list to get an ID
        list_response = requests.get(f"{BASE_URL}/projects", timeout=10)
        if list_response.status_code != 200:
            return print_result(False, "Failed to get project list", list_response)
        
        projects = list_response.json()
        if not projects:
            return print_result(False, "No projects available to test")
        
        project_id = projects[0]["id"]
        
        # Now get single project
        response = requests.get(f"{BASE_URL}/projects/{project_id}", timeout=10)
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        project = response.json()
        if project.get("id") != project_id:
            return print_result(False, f"ID mismatch: expected {project_id}, got {project.get('id')}", response)
        
        return print_result(True, f"Retrieved project: {project.get('title')}")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_all_without_auth():
    """Test 9: GET /api/projects/all without auth - should return 401"""
    print_test("Projects - GET /all without auth")
    
    try:
        response = requests.get(f"{BASE_URL}/projects/all", timeout=10)
        
        if response.status_code != 401:
            return print_result(False, f"Expected 401, got {response.status_code}", response)
        
        return print_result(True, "Correctly rejected unauthenticated request with 401")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_all_with_auth():
    """Test 10: GET /api/projects/all with token - should return all projects"""
    print_test("Projects - GET /all with auth")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    try:
        response = requests.get(
            f"{BASE_URL}/projects/all",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        projects = response.json()
        count = len(projects)
        
        return print_result(True, f"Retrieved {count} projects (including unpublished)")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_create_without_auth():
    """Test 11: POST /api/projects without auth - should return 401"""
    print_test("Projects - POST without auth")
    
    try:
        response = requests.post(
            f"{BASE_URL}/projects",
            json={"title": "Test Project", "category": "Water"},
            timeout=10
        )
        
        if response.status_code != 401:
            return print_result(False, f"Expected 401, got {response.status_code}", response)
        
        return print_result(True, "Correctly rejected unauthenticated request with 401")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_create_with_auth():
    """Test 12: POST /api/projects with admin token"""
    global test_project_id
    print_test("Projects - POST with admin auth")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    try:
        payload = {
            "title": "Test Water Project",
            "category": "Water",
            "client": "Test Client LLC",
            "location": "Muscat, Oman",
            "year": 2024,
            "summary": "A test project for API validation",
            "description": "Detailed description of the test project",
            "image_url": "https://images.unsplash.com/photo-1533077162801-86490c593afb",
            "gallery": [],
            "is_published": True
        }
        
        response = requests.post(
            f"{BASE_URL}/projects",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        project = response.json()
        if "id" not in project:
            return print_result(False, "No ID in created project", response)
        
        test_project_id = project["id"]
        return print_result(True, f"Created project with ID: {test_project_id}")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_update():
    """Test 13: PATCH /api/projects/{id} to flip is_published to false"""
    print_test("Projects - PATCH to unpublish")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    if not test_project_id:
        return print_result(False, "No test project ID available")
    
    try:
        # Update to unpublish
        response = requests.patch(
            f"{BASE_URL}/projects/{test_project_id}",
            json={"is_published": False},
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        project = response.json()
        if project.get("is_published") != False:
            return print_result(False, f"is_published should be False, got {project.get('is_published')}", response)
        
        # Verify it's hidden from public list
        public_response = requests.get(f"{BASE_URL}/projects", timeout=10)
        if public_response.status_code == 200:
            public_projects = public_response.json()
            found = any(p["id"] == test_project_id for p in public_projects)
            if found:
                return print_result(False, "Unpublished project still appears in public list")
        
        return print_result(True, "Successfully unpublished project and verified it's hidden from public list")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_delete():
    """Test 14: DELETE /api/projects/{id}"""
    print_test("Projects - DELETE")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    if not test_project_id:
        return print_result(False, "No test project ID available")
    
    try:
        response = requests.delete(
            f"{BASE_URL}/projects/{test_project_id}",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        data = response.json()
        if not data.get("ok"):
            return print_result(False, "Response should contain ok:true", response)
        
        return print_result(True, "Successfully deleted project")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_list_without_auth():
    """Test 15: GET /api/users without token - should return 401"""
    print_test("Users - GET list without auth")
    
    try:
        response = requests.get(f"{BASE_URL}/users", timeout=10)
        
        if response.status_code != 401:
            return print_result(False, f"Expected 401, got {response.status_code}", response)
        
        return print_result(True, "Correctly rejected unauthenticated request with 401")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_list_with_super_admin():
    """Test 16: GET /api/users with super_admin token"""
    print_test("Users - GET list with super_admin token")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    try:
        response = requests.get(
            f"{BASE_URL}/users",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        users = response.json()
        if not isinstance(users, list):
            return print_result(False, "Response is not a list", response)
        
        if len(users) < 1:
            return print_result(False, "Expected at least 1 user (default admin)", response)
        
        return print_result(True, f"Retrieved {len(users)} user(s)")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_create_editor():
    """Test 17: POST /api/users to create editor"""
    global editor_user_id
    print_test("Users - POST to create editor")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    try:
        payload = {
            "name": "Test Editor",
            "email": "editor@test.com",
            "password": "Editor@12345",
            "role": "editor"
        }
        
        response = requests.post(
            f"{BASE_URL}/users",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        user = response.json()
        if "id" not in user:
            return print_result(False, "No ID in created user", response)
        
        if user.get("role") != "editor":
            return print_result(False, f"Expected role=editor, got {user.get('role')}", response)
        
        editor_user_id = user["id"]
        return print_result(True, f"Created editor user with ID: {editor_user_id}")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_login_as_editor():
    """Test 18: Login as the new editor"""
    global editor_token
    print_test("Users - Login as editor")
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": "editor@test.com", "password": "Editor@12345"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        data = response.json()
        if "access_token" not in data:
            return print_result(False, "Missing access_token", response)
        
        user = data.get("user", {})
        if user.get("role") != "editor":
            return print_result(False, f"Expected role=editor, got {user.get('role')}", response)
        
        editor_token = data["access_token"]
        return print_result(True, "Editor login successful")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_list_as_editor():
    """Test 19: GET /api/users as editor - should return 403"""
    print_test("Users - GET list as editor (should fail)")
    
    if not editor_token:
        return print_result(False, "No editor token available")
    
    try:
        response = requests.get(
            f"{BASE_URL}/users",
            headers={"Authorization": f"Bearer {editor_token}"},
            timeout=10
        )
        
        if response.status_code != 403:
            return print_result(False, f"Expected 403, got {response.status_code}", response)
        
        return print_result(True, "Correctly rejected editor access with 403")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_create_as_editor():
    """Test 20: POST /api/users as editor - should return 403"""
    print_test("Users - POST as editor (should fail)")
    
    if not editor_token:
        return print_result(False, "No editor token available")
    
    try:
        response = requests.post(
            f"{BASE_URL}/users",
            json={"name": "Test", "email": "test@test.com", "password": "Test123", "role": "editor"},
            headers={"Authorization": f"Bearer {editor_token}"},
            timeout=10
        )
        
        if response.status_code != 403:
            return print_result(False, f"Expected 403, got {response.status_code}", response)
        
        return print_result(True, "Correctly rejected editor access with 403")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_projects_create_as_editor():
    """Test 21: POST /api/projects as editor - should succeed"""
    print_test("Projects - POST as editor (should succeed)")
    
    if not editor_token:
        return print_result(False, "No editor token available")
    
    try:
        payload = {
            "title": "Editor Test Project",
            "category": "Telecom",
            "client": "Editor Client",
            "location": "Test Location",
            "year": 2024,
            "summary": "Test summary",
            "description": "Test description",
            "is_published": True
        }
        
        response = requests.post(
            f"{BASE_URL}/projects",
            json=payload,
            headers={"Authorization": f"Bearer {editor_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        project = response.json()
        if "id" not in project:
            return print_result(False, "No ID in created project", response)
        
        # Clean up - delete the project
        if admin_token:
            requests.delete(
                f"{BASE_URL}/projects/{project['id']}",
                headers={"Authorization": f"Bearer {admin_token}"},
                timeout=10
            )
        
        return print_result(True, "Editor can create projects (correct permission)")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_update():
    """Test 22: PATCH /api/users/{id} as super_admin"""
    print_test("Users - PATCH to update name")
    
    if not admin_token or not editor_user_id:
        return print_result(False, "Missing admin token or editor user ID")
    
    try:
        response = requests.patch(
            f"{BASE_URL}/users/{editor_user_id}",
            json={"name": "Updated Editor Name"},
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        user = response.json()
        if user.get("name") != "Updated Editor Name":
            return print_result(False, f"Name not updated correctly", response)
        
        return print_result(True, "Successfully updated user name")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_deactivate_self():
    """Test 23: Try to deactivate own super_admin account - should return 400"""
    print_test("Users - Try to deactivate own account (should fail)")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    try:
        # Get own user ID
        me_response = requests.get(
            f"{BASE_URL}/auth/me",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if me_response.status_code != 200:
            return print_result(False, "Failed to get own user info")
        
        my_id = me_response.json()["id"]
        
        # Try to deactivate
        response = requests.patch(
            f"{BASE_URL}/users/{my_id}",
            json={"is_active": False},
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 400:
            return print_result(False, f"Expected 400, got {response.status_code}", response)
        
        return print_result(True, "Correctly prevented self-deactivation with 400")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_delete_self():
    """Test 24: Try to delete own account - should return 400"""
    print_test("Users - Try to delete own account (should fail)")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    try:
        # Get own user ID
        me_response = requests.get(
            f"{BASE_URL}/auth/me",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if me_response.status_code != 200:
            return print_result(False, "Failed to get own user info")
        
        my_id = me_response.json()["id"]
        
        # Try to delete
        response = requests.delete(
            f"{BASE_URL}/users/{my_id}",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 400:
            return print_result(False, f"Expected 400, got {response.status_code}", response)
        
        return print_result(True, "Correctly prevented self-deletion with 400")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_users_delete_editor():
    """Test 25: DELETE /api/users/{id} of editor as super_admin"""
    print_test("Users - DELETE editor user")
    
    if not admin_token or not editor_user_id:
        return print_result(False, "Missing admin token or editor user ID")
    
    try:
        response = requests.delete(
            f"{BASE_URL}/users/{editor_user_id}",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        data = response.json()
        if not data.get("ok"):
            return print_result(False, "Response should contain ok:true", response)
        
        return print_result(True, "Successfully deleted editor user")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_uploads_without_auth():
    """Test 26: POST /api/uploads/image without auth - should return 401"""
    print_test("Uploads - POST without auth")
    
    try:
        # Create a small test image
        img = Image.new('RGB', (10, 10), color='red')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        files = {'file': ('test.png', img_bytes, 'image/png')}
        response = requests.post(f"{BASE_URL}/uploads/image", files=files, timeout=10)
        
        if response.status_code != 401:
            return print_result(False, f"Expected 401, got {response.status_code}", response)
        
        return print_result(True, "Correctly rejected unauthenticated upload with 401")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def test_uploads_with_auth():
    """Test 27: POST /api/uploads/image with auth"""
    print_test("Uploads - POST with auth")
    
    if not admin_token:
        return print_result(False, "No admin token available")
    
    try:
        # Create a small test image
        img = Image.new('RGB', (10, 10), color='blue')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        files = {'file': ('test_upload.png', img_bytes, 'image/png')}
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        response = requests.post(
            f"{BASE_URL}/uploads/image",
            files=files,
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}", response)
        
        data = response.json()
        if "url" not in data:
            return print_result(False, "Missing url in response", response)
        
        if "filename" not in data:
            return print_result(False, "Missing filename in response", response)
        
        if "size" not in data:
            return print_result(False, "Missing size in response", response)
        
        # Test static file serving
        file_url = f"https://global-five-ts.preview.emergentagent.com{data['url']}"
        file_response = requests.get(file_url, timeout=10)
        
        if file_response.status_code != 200:
            return print_result(False, f"Uploaded file not accessible at {file_url}, status: {file_response.status_code}")
        
        return print_result(True, f"Upload successful, file accessible at {data['url']}")
    
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False


def run_all_tests():
    """Run all tests and report summary"""
    print("\n" + "="*80)
    print("GLOBAL FIVE TS - BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin: {ADMIN_EMAIL}")
    print("="*80)
    
    results = []
    
    # Auth tests
    results.append(("Auth - Login Success", test_auth_login_success()))
    results.append(("Auth - Login Bad Password", test_auth_login_bad_password()))
    results.append(("Auth - /me Without Token", test_auth_me_without_token()))
    results.append(("Auth - /me With Token", test_auth_me_with_token()))
    
    # Projects tests
    results.append(("Projects - Public List", test_projects_public_list()))
    results.append(("Projects - Filter Water", test_projects_filter_by_category_water()))
    results.append(("Projects - Filter Telecom Limit", test_projects_filter_telecom_limit()))
    results.append(("Projects - Get Single", test_projects_get_single()))
    results.append(("Projects - /all Without Auth", test_projects_all_without_auth()))
    results.append(("Projects - /all With Auth", test_projects_all_with_auth()))
    results.append(("Projects - POST Without Auth", test_projects_create_without_auth()))
    results.append(("Projects - POST With Auth", test_projects_create_with_auth()))
    results.append(("Projects - PATCH Unpublish", test_projects_update()))
    results.append(("Projects - DELETE", test_projects_delete()))
    
    # Users tests
    results.append(("Users - GET Without Auth", test_users_list_without_auth()))
    results.append(("Users - GET With Super Admin", test_users_list_with_super_admin()))
    results.append(("Users - POST Create Editor", test_users_create_editor()))
    results.append(("Users - Login As Editor", test_users_login_as_editor()))
    results.append(("Users - GET As Editor (403)", test_users_list_as_editor()))
    results.append(("Users - POST As Editor (403)", test_users_create_as_editor()))
    results.append(("Projects - POST As Editor (200)", test_projects_create_as_editor()))
    results.append(("Users - PATCH Update", test_users_update()))
    results.append(("Users - Deactivate Self (400)", test_users_deactivate_self()))
    results.append(("Users - Delete Self (400)", test_users_delete_self()))
    results.append(("Users - DELETE Editor", test_users_delete_editor()))
    
    # Upload tests
    results.append(("Uploads - POST Without Auth", test_uploads_without_auth()))
    results.append(("Uploads - POST With Auth", test_uploads_with_auth()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    print(f"\nTotal: {total} tests")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {total - passed} ❌")
    print(f"Success Rate: {(passed/total)*100:.1f}%")
    
    if total - passed > 0:
        print("\nFailed Tests:")
        for name, result in results:
            if not result:
                print(f"  ❌ {name}")
    
    print("\n" + "="*80)
    
    return passed == total


if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)
