import requests as r
response = r.request("POST","http://localhost:4545/create_new_data", data='{}', headers= {'Content-Type': 'application/json'})
print(response.text)
# import json

# with open(r"C:\Users\Ahmad El-Gohary\Documents\GitHub\Auction Sprint\Items\data.json") as f: data = json.loads(f.read())

# for i,item in enumerate(data):

    


#     response = r.request("POST","http://localhost:4545/item", data=json.dumps(item), headers= {'Content-Type': 'application/json'})

#     response =r.request("DELETE",f"http://localhost:4545/item/{item['_id']}", headers= {'Content-Type': 'application/json'})

# print(response.text)

# with open(r"C:\Users\Ahmad El-Gohary\Documents\GitHub\Auction Sprint\Items\data.json","w") as f: f.write(json.dumps(data,indent=4))