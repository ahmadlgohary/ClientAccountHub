import requests as r
#response = r.request("POST","http://localhost:4545/create_new_data", data='{}', headers= {'Content-Type': 'application/json'})
#response = r.request("GET","http://localhost:4545/get_user_by_email/user3@example.com", data='{}', headers= {'Content-Type': 'application/json'})
# response =r.request("DELETE",f"http://localhost:4545/delete_data/Group5@torontomu.ca", headers= {'Content-Type': 'application/json'})

#response = r.request("PUT","http://localhost:4545/change_role", data='{"email":"Group5@torontomu.ca","role":"Secondary_User"}', headers= {'Content-Type': 'application/json'})
#response = r.request("PUT","http://localhost:4545/change_email", data='{"email":"Group5@torontomu.ca","new_email":"cadecunningham@detroit.com"}', headers= {'Content-Type': 'application/json'})


print(response.text)