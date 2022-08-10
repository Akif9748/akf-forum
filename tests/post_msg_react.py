import requests

# Headers for login to Akf-forum
headers = {
    "username": "testUser",
    "password": "testPassword"
}

r = requests.post("http://localhost:3000/api/messages/0/react/like",
                  headers=headers)

print(r.json())

example_response = {
    'status': 200,
    'result': 1 # Number of likes
}
