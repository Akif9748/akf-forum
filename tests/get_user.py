import requests

# Headers for login to Akf-forum
headers = {
    "username": "testUser",
    "password": "testPassword"
}


r = requests.get("http://localhost:3000/api/users/0/", headers=headers)

print(r.json())

example_response = {
    'status': 200,
    'result': {
        'name': 'Akif9748',
        'avatar': 'https://www.technopat.net/sosyal/data/avatars/o/298/298223.jpg?1644694020',
        'time': 1647895891332,
        'admin': True,
        'deleted': False,
        'id': 0
    }
}
