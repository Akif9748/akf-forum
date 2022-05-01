# akf-forum
<img src="https://raw.githubusercontent.com/Akif9748/akf-forum/main/public/images/logo.jpg" align="right" width="300px" />

A Node.js based forum software.

## Installation
- Clone this repo. Or download it.
- Write `npm i` to install **dependencies**.
- Write `node reset` for **reset database**, and `npm start` for run it. 
- Note, the reset database is important!

## API
Akf-forum has got an API for other clients etc. You can test api with run apitest.py.
And, you can learn informations about API in `APIDOCS.md`.

## Credits
* [Akif9748](https://github.com/Akif9748) - Project owner, main developer
* [Camroku](https://github.com/Camroku) - Made stylesheets

## To Do (Backend, bug fixes) 
- `/errors/error` will change, better error page.
- Redirect query.
- middleware for timeouts
- DELETED USERS: USERLIST

## Roadmap
### User
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Login | Yes | HIGH |
| Register | Yes | HIGH |
| Logout | Yes | HIGH |
| Admin | Yes | HIGH |
| Message count | Yes | MEDIUM |
| Delete user | Yes | HIGH |
| Signature | No | LOW |
| About me | No | LOW |
| Edit user | No | HIGH |
| IP ban | No | HIGH |

### Messages
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Ratelimit | No | HIGH |
| Send | Yes | HIGH |
| Delete | Yes | HIGH |
| Edit | No | HIGH |
| React | Yes | MEDIUM |

### Threads
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Create | Yes | HIGH |
| Edit | No | HIGH |
| Delete | No | HIGH |

### API
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Other clients for forum via API | Yes | LOW |
| Delete message | No | MEDIUM |
| Send message | Yes | MEDIUM |
| Create thread | Yes | MEDIUM |
| Get info about thread | Yes | MEDIUM |

### Other
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Footer | Yes | LOW |
| Multi-theme support | No | MEDIUM |
| Search | No | MEDIUM |
| Better view | Yes | MEDIUM |
| Sending message etc. will return API model | No | MEDIUM |

## Screenshot
![akf-forum](https://user-images.githubusercontent.com/70021050/160255959-ef216cba-1348-4d4b-9347-fe67e21348e7.png)
