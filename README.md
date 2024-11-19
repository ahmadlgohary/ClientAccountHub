# CPS714_Assignment


## API Endpoints

| **Endpoint**      | **Request**                                                                                     | **Response**                                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `POST /add_user/:email` | **Body:** `{ "role": "user" }` <br> **Params:** `email` <br> Creates a new user with `email`, `role`, `point_balance: 0`, `transaction_history: {}`, and `activity_log: []`. | **Success (201):** `{ "message": "User created successfully", "user": { "email": "string", "role": "string", "point_balance": 0 } }` <br> **Error (500):** `{ "message": "Error occurred while creating user", "error": "Error message" }` |
| `PUT /change_role` | **Body:** `{ "email": "string", "role": "string" }` <br> Updates the `role` of an existing user identified by `email`. | **Success (200):** `{ "message": "User's role changed successfully", "email": "string" }` <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Could not change role", "error": "Error message" }` |
| `PUT /change_email` | **Body:** `{ "current_email": "string", "new_email": "string" }` <br> Updates the `email` of an existing user. | **Success (200):** `{ "message": "User's email changed successfully", "new_email": "string" }` <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Could not change email", "error": "Error message" }` |