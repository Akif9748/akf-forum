# API documentation of Akf-forum
<img src="https://raw.githubusercontent.com/Akif9748/akf-forum/main/public/images/logo.jpg" align="right" width="300px" />

Akf-forum has got an API for AJAX, other clients etc. 

## Authorization
You need this headers for send request to API:
```json
{
    "username": "testUser", 
    "password": "testPassword"
}
```
But in front end, the API will works with session.

## How to request?

### Request types:
- GET `/api/users/:id` for fetch user.
- POST `/api/users/:id/delete` for delete user.
- POST `/api/users/:id/undelete` for undelete user.
- POST `/api/users/:id/admin` for give admin permissions for a user.

- GET `/api/threads/:id` for fetch thread.
- GET `/api/threads/:id/messages/` for fetch messages in thread.
- POST `/api/threads` for create thread.
- POST `/api/threads/:id/delete` for delete thread.
- POST `/api/threads/:id/undelete` for undelete thread.

- GET `/api/messages/:id` for fetch message.
- POST `/api/messages` for create message.
- POST `/api/messages/:id/delete` for delete message.
- POST `/api/messages/:id/undelete` for undelete message.
- POST `/api/messages/:id/react/:type` for react to a message.

### Example request:
GET ```/api/messages/0```

#### Example API Output:
```json
{
    "_id": "63067429bc01da866fad508b",
    "threadID": "0",
    "author": {
        "id": "0",
        "name": "Akif9748",
        "avatar": "https://cdn.discordapp.com/avatars/539506680140922890/abd74d10aac094fc8a5ad5c86f29fdb9.png?size=1024",
        "time": "2022-08-24T18:54:55.666Z",
        "deleted": false,
        "admin": false,
        "_id": "630673ffbc01da866fad507b",
        "__v": 0
    },
    "content": "deneme",
    "deleted": false,
    "edited": false,
    "time": "2022-08-24T18:55:37.744Z",
    "id": "0",
    "__v": 0,
    "react": {
        "like": [0],
        "dislike":[]
    },
    "authorID": "0"
}
```