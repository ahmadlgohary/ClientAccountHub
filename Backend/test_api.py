import unittest
import requests

BASE_URL = "https://client-account-hub.onrender.com"

class TestUserManagementAPI(unittest.TestCase):

    def test_add_user(self):
        payload = {
            "email": "testuser@example.com",
            "role": "user"
        }
        response = requests.post(f"{BASE_URL}/add_user", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertIn("User created successfully", response.json().get("message"))

    def test_get_all_users(self):
        response = requests.get(f"{BASE_URL}/get_all_users")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Successfully Found all User Data", response.json().get("message"))

    def test_get_user_by_email(self):
        email = "testuser@example.com"
        response = requests.get(f"{BASE_URL}/get_user_by_email/{email}")
        if response.status_code == 200:
            self.assertIn("Successfully Found User Data", response.json().get("message"))
        else:
            self.assertIn("User not found", response.json().get("error"))

    def test_change_role(self):
        payload = {
            "email": "testuser@example.com",
            "role": "admin"
        }
        response = requests.put(f"{BASE_URL}/change_role", json=payload)
        if response.status_code == 200:
            self.assertIn("User's role changed successfully", response.json().get("message"))
        else:
            self.assertIn("User not found", response.json().get("message"))

    def test_change_email(self):
        payload = {
            "email": "testuser@example.com",
            "new_email": "updateduser@example.com"
        }
        response = requests.put(f"{BASE_URL}/change_email", json=payload)
        if response.status_code == 200:
            self.assertIn("User's email changed successfully", response.json().get("message"))
        else:
            self.assertIn("User not found", response.json().get("message"))

    def test_update_activity_log(self):
        payload = {
            "email": "updateduser@example.com",
            "activity_type": "login",
            "activity_field": "web",
            "activity_date": "2024-11-23"
        }
        response = requests.put(f"{BASE_URL}/update_activity_log", json=payload)
        if response.status_code == 200:
            self.assertIn("Activity log successfully updated", response.json().get("message"))
        else:
            self.assertIn("User not found", response.json().get("message"))

    def test_update_transactions(self):
        payload = {
            "email": "updateduser@example.com",
            "transaction_id": "12345",
            "transaction_type": "purchase",
            "transaction_date": "2024-11-23",
            "transaction_cost": 50,
            "productName": "Sample Product",
            "points_change": 10,
            "description": "Test transaction"
        }
        response = requests.put(f"{BASE_URL}/update_transactions", json=payload)
        if response.status_code == 200:
            self.assertIn("Transaction history updated successfully", response.json().get("message"))
        else:
            self.assertIn("Error occurred while updating transaction history", response.json().get("message"))


    def test_z_delete_user_by_email(self):
        email = "updateduser@example.com"
        response = requests.delete(f"{BASE_URL}/delete_user_by_email/{email}")
        if response.status_code == 200:
            self.assertIn("User Data Successfully Removed", response.json().get("message"))
        else:
            self.assertIn("User not found", response.json().get("message"))

    def test_readme(self):
        response = requests.get(f"{BASE_URL}/readme")
        self.assertIn("<html>", response.text)  

if __name__ == "__main__":
    unittest.main()
