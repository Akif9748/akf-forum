import requests

# Headers for login to Akf-forum
headers = {
    "username": "testUser",
    "password": "testPassword"
}


r = requests.get("http://localhost:3000/api/messages/1/", headers=headers)

print(r.json())

example_response = {
    'status': 200,
    'result': {
        'authorID': 0,
        'content': 'a',
        'author': {
            'name': 'Akif9748',
            'avatar': 'https://www.technopat.net/sosyal/data/avatars/o/298/298223.jpg?1644694020',
            'time': 1649189944864,
            'admin': False,
            'deleted': False,
            'id': 0
        },
        'time': 1649189950166,
        'threadID': 0,
        'deleted': False,
        'edited': False,
        # Reactions: {userid: isLike (Bool)}
        'react': {'0': True},
        'id': 0
    }
}
