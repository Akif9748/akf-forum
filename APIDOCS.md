# API documentation of Akf-forum
Akf-forum has got an API for AJAX, other clients etc. 

## Authorization
You need this header for send request to API:
```json
{
    "authorization": "Basic <base64 encoded username:password>"
}
```

But in front end, the API will works with session.

## Default Limits:
- 3 - 25 char for username, password and category name
- 256 char for user about and desp of category
- 5 - 128 char for thread titles.
- 5 - 1024 char for messages.

You can change them in config.json.

## How to request?
### Request types:
#### `/api/me`
- GET `/api/me` to get your account.

#### `/api/bans`
- GET `/` fetch all bans.
- GET `/:ip` fetch a ban.
- DELETE `/:ip` for unban an IP adress.
- POST `/?reason=flood` for ban an IP adress.

#### `/api/categories`
- GET `/` fetch all categories.
- GET `/:id` fetch a category
- PATCH `/:id` for update a category.
- DELETE `/:id` for delete a category.
- POST `/` for create a category.

#### `/api/messages`
- GET `/:id` for fetch message.
- DELETE `/:id` for delete message.
- PATCH `/:id` for edit message.
- POST `/:id/undelete` for undelete message.
- POST `/:id/react/:type` for react to a message.
- POST `/` for create message.


#### `/api/search` use `?limit=&skip=` for skip and limit
- GET `/users?q=query` find users.
- GET `/threads?q=query&authorID=not_required` find threads.
- GET `/messages?q=query&authorID=not_required` find messages.

#### `/api/threads`
- GET `/:id` for fetch thread.
- DELETE `/:id` for delete thread.
- PATCH `/:id` for edit thread.
- GET `/:id/messages?skip=0&limit=10` for fetch messages in thread.
- POST `/` for create thread.

#### `/api/users`
- GET `/:id` for fetch user.
- DELETE `/:id` for delete user.
- PATCH `/:id` for edit user.
- PUT `/:id` for add profile photo to user.

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