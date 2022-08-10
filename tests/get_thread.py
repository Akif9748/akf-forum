import requests

# Headers for login to Akf-forum
headers = {
    "username": "testUser",
    "password": "testPassword"
}


r = requests.get("http://localhost:3000/api/threads/0/", headers=headers)

print(r.json())

example_response = {
    "status": 200,
    "result": {
        "author": {
            "name": "Akif9748",
            "avatar": "https://www.technopat.net/sosyal/data/avatars/o/298/298223.jpg?1644694020",
            "time": 1647895891332,
            "admin": False,
            "deleted": False,
            "id": "0"
        },
        "title": "First Thread",
        "messages": ["0", "1", "2", "3"],
        "time": 1647895907054,
        "deleted": False,
        "id": "0"
    }
}
