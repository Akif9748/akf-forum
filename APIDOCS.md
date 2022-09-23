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
- POST `/:id/ban` for ban all ips of user.

### Example request:
GET ```/api/messages/0```

#### Example API Output:
```js
{
    "react": {
        "like": [],
        "dislike": ["0"]
    },
    "_id": "6325c216faa938c4cfc43075",
    "author": {
        "_id": "632e028ca4ba362ebbb75a43",
        "name": "Akif9748",
        "avatar": "/images/avatars/0.jpg",
        "deleted": false,
        "edited": true,
        "about": "# Owner",
        "admin": true,
        "theme": "black",
        "hideLastSeen": false,
        "time": "2022-09-23T19:01:32.610Z",
        "id": "0",
        "__v": 0,
        "discordID": "539506680140922890"
    },
    "threadID": "0",
    "content": "This is a thread opened via API, yes",
    "deleted": false,
    "edited": true,
    "time": "2022-09-17T12:48:22.378Z",
    "id": "0",
    "__v": 4,
    "oldContents": []
}
```