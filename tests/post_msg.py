import requests

# Headers for login to Akf-forum
headers = {
    "username": "testUser",
    "password": "testPassword"
}

# Body for message parameters
body = {
    "content": "This message sent via API",
    "threadID": 0
}

r = requests.post("http://localhost:3000/api/messages/",
                  headers=headers, data=body)

print(r.json())

example_response = {
    'status': 200,
    'result': {
        'content': 'This message sent via API',
        'author': {
            'name': 'testUser',
            'avatar': '',
            'time': 1649009854217,
            'admin': False,
            'deleted': False,
            'id': "2"
        },
        'time': 1649010863471,
        'threadID': "1",
        'deleted': False,
        'edited': False,
        'react': {},
        'id': "6"
    }
}
