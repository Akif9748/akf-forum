import requests

# Headers for login to Akf-forum
headers = {
    "username": "testUser",
    "password": "testPassword"
}

# Body for message parameters
body = {
    "content": "This message sent via API",
    "title": "This thread opened by API"
}

r = requests.post("http://localhost:3000/api/threads/",
                  headers=headers, data=body)

print(r.json())

example_response = {
    'status': 200,
    'result': {
        'author': {
            'name': 'Akif9748',
            'avatar': 'https://www.technopat.net/sosyal/data/avatars/o/298/298223.jpg?1644694020',
            'time': 1647895891332, 'admin': True, 'deleted': False, 'id': "0"
        },
        'title': 'API TEST',
        'messages': ["4", "6"],
        'time': 1649010834064,
        'deleted': False,
        'edited': False,
        'id': "1",

    }
}
