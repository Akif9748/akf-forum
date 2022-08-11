# API documentation of Akf-forum
<img src="https://raw.githubusercontent.com/Akif9748/akf-forum/main/public/images/logo.jpg" align="right" width="300px" />

Akf-forum has got an API for other clients etc. 

You can find examples in `tests` folder.

## Authorization
You need this headers for send request to API:
```json
{
    "username": "testUser", 
    "password": "testPassword"
}
```

## How to request?

### Request types:
- GET `/api/users/:id` for fetch user.
- POST `/api/users/:id/delete` for delete user.
- POST `/api/threads` for create thread.
- GET `/api/threads/:id` for fetch thread.
- POST `/api/threads/:id/delete` for delete thread.
- GET `/api/messages/:id` for fetch message.
- POST `/api/messages` for create message.
- POST `/api/messages/:id/delete` for delete message.
- POST `/api/messages/:id/react/:type` for react to a message.

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
        "id": "1",
        "author": {
            "name": "ForumcuCocuk",
            "avatar": "/images/guest.png",
            "time": 1647177723873,
            "admin": true,
            "id": "1"
        },
        "threadID":"0" 
    }
}

 ```


