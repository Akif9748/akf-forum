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
- GET `/api/search/users?q=query` find users.
- GET `/api/search/threads?q=query&authorID=not_required` find threads.
- GET `/api/search/messages?q=query&authorID=not_required` find messages.

- GET `/api/bans/` fetch all bans.
- GET `/api/bans/:id` fetch a ban.
- DELETE `/api/bans/:id` for unban an IP adress.
- POST `/api/bans?reason=flood` for ban an IP adress.

- GET `/api/users/:id` for fetch user.
- DELETE `/api/users/:id/` for delete user.
- PATCH `/api/users/:id/` for edit user.
- POST `/api/users/:id/undelete` for undelete user.

- GET `/api/threads/:id` for fetch thread.
- DELETE `/api/threads/:id/` for delete thread.
- PATCH `/api/threads/:id/` for edit thread.
- POST `/api/threads/:id/undelete` for undelete thread.
- GET `/api/threads/:id/messages?skip=0&limit=10` for fetch messages in thread.
- POST `/api/threads` for create thread.

- GET `/api/messages/:id` for fetch message.
- DELETE `/api/messages/:id/` for delete message.
- PATCH `/api/messages/:id/` for edit message.
- POST `/api/messages/:id/undelete` for undelete message.
- POST `/api/messages/:id/react/:type` for react to a message.
- POST `/api/messages` for create message.

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
        "dislike": []
    },
    "authorID": "0"
}
```