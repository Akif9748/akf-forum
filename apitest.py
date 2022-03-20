import requests

# Headers for login to Akf-forum 
headers = {
    "username": "testUser",
    "password": "testPassword"
}


r = requests.get("http://localhost:3000/api/message/1/", headers=headers)

print(r.json())

example_response = {
    "status": 200,
    "result":
    {  # content of message
        "content": "a",
        # author of message
        "author": {
            "name": "ForumcuCocuk",
            "avatar": "/images/guest.png",
            "time": 1647177723873,
            "admin": True,
            "id": 1
        },
        # UNIX Timestamp of message
        "time": 1647178873587,
        # thread information of message
        "thread": {
            "author": {
                "name": "ForumcuCocuk",
                "avatar": "/images/guest.png",
                "time": 1647177723873,
                "admin": True,
                "id": 1
            },
            "title": "My",
            "messages": [0],  # ids of messages
            "time": 1647178870047,
            "deleted": False,
            "id": "0"
        },
        # Other informations about message
        "deleted": False,
        "edited": False,
        "react": {},
        "id": "1"
    }
}
