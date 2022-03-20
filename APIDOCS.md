# API documentation of Akf-forum
<img src="https://raw.githubusercontent.com/Akif9748/akf-forum/main/public/images/logo.jpg" align="right" width="300px" />

Akf-forum has got an API for other clients etc. 

You can find an example in apitest.py.

## Authorization
You need this headers for send request to API:
```jsonc
{
    "username": "testUser", 
    "password": "testPassword"
}
```


## How to request?

### Request type:
  `GET /api/action/id` 

### "action" types:
- `message`

(for now, only message.)

### "id":
ID for action type.


### Example request:
```GET /api/message/1```

#### Example API Output:
 ```json
 {
    "status": 200,
    "result":
    {       
        "content": "First message",
        "time": 1647178873587,
        "deleted": false,
        "edited": false,
        "react": {},
        "id": 1,
        "author": {
            "name": "ForumcuCocuk",
            "avatar": "/images/guest.png",
            "time": 1647177723873,
            "admin": true,
            "id": 1
        },
        "thread": {
            "author": {
                "name": "Akif9748",
                "avatar": "/images/guest.png",
                "time": 1647177705200,
                "admin": true,
                "id": 0
            },
            "title": "First Thread",
            "messages": [0, 1], 
            "time": 1647178870047,
            "deleted": false,
            "id": 0
        }   
    }
}

 ```


