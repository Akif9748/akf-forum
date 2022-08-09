# akf-forum
<img src="https://raw.githubusercontent.com/Akif9748/akf-forum/main/public/images/logo.jpg" align="right" width="300px" />

A forum software written in Node.js.

## Installation
- Clone or download this repo.
- Run `npm i` to install **dependencies**.
- Run `npm start` for run it. 

### Extra
Run `node util/reset` to **reset the database**, and run `node util/admin` for give admin perms for first member.

## API
Akf-forum has got an API for other clients etc. You can test api with run apitest.py.
And, you can learn about API in `util/APIDOCS.md`.

## Credits
* [Akif9748](https://github.com/Akif9748) - Project mainteiner, main developer
* [Camroku](https://github.com/Camroku) - Made stylesheets

## To do (Backend, bug fixes) 
- `/errors/error` will change, better error page.
- Redirect query.
- Will fix API
- message.js/12, so, admin perms,(req.user?.admin || !thread.deleted), and api in message
## Roadmap
### User
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Login | 🟢 | HIGH |
| Register | 🟢 | HIGH |
| Logout | 🟢 | HIGH |
| Admin | 🟢 | HIGH |
| Message count | 🟢 | MEDIUM |
| Delete user | 🟢 | HIGH |
| Signature | 🔴 | LOW |
| About me | 🔴 | LOW |
| Edit user | 🔴 | HIGH |
| IP ban | 🔴 | HIGH |

### Messages
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Ratelimit | 🟢 | HIGH |
| Send | 🟢 | HIGH |
| Delete | 🟢 | HIGH |
| React | 🟢 | MEDIUM |
| Edit | 🔴 | HIGH |

### Threads
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Create | 🟢 | HIGH |
| Delete | 🟢 | HIGH |
| Edit | 🔴 | HIGH |

### API
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Other clients for forum via API | 🟢 | LOW |
| Send message | 🟢 | MEDIUM |
| Create thread | 🟢 | MEDIUM |
| Get info about thread | 🟢 | MEDIUM |
| Delete message | 🔴 | MEDIUM |

### Other
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Footer | 🟢 | LOW |
| Multi-theme support | 🔴 | LOW |
| Search | 🔴 | MEDIUM |
| Better view | 🟢 | MEDIUM |
| Sending message etc. will use fetch API | 🔴 | MEDIUM |

## Screenshot
![akf-forum](https://user-images.githubusercontent.com/70021050/160255959-ef216cba-1348-4d4b-9347-fe67e21348e7.png)
