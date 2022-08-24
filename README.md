# akf-forum
<img src="https://raw.githubusercontent.com/Akif9748/akf-forum/main/public/images/logo.jpg" align="right" width="300px" />

A forum software written in Node.js.

## Installation
- Clone or download this repo.
- Run `npm i` to install **dependencies**.
- Run `npm start` for run it. 

### Extra
Run `node util/reset` to **reset the database**, and run `node util/admin` for give admin perms to first member.

## API
Akf-forum has got an API for other clients etc. You can test api with python files in `test` folder. 

Python is only for testing 😭

And, you can learn about API in `util/APIDOCS.md`.

## Credits
* [Akif9748](https://github.com/Akif9748) - Project mainteiner, main developer
* [Camroku](https://github.com/Camroku) - Made stylesheets

## Roadmap
### User
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Login via redirect query | 🟢 | HIGH |
| Register | 🟢 | HIGH |
| Logout | 🟢 | HIGH |
| Admin | 🟢 | HIGH |
| Message count | 🟢 | MEDIUM |
| Delete user | 🟢 | HIGH |
| Undelete | 🔴 | MEDIUM |
| About me | 🔴 | LOW |
| Edit user | 🔴 | HIGH |
| IP ban | 🔴 | MEDIUM |

### Messages
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Ratelimit | 🟢 | HIGH |
| Send | 🟢 | HIGH |
| Delete | 🟢 | HIGH |
| Regex for scripts | 🔴 | HIGH |
| Undelete | 🔴 | MEDIUM |
| React | 🟢 | MEDIUM |
| Edit | 🔴 | MEDIUM |

### Threads
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Ratelimit | 🟢 | HIGH |
| Create | 🟢 | HIGH |
| Delete | 🟢 | HIGH |
| Undelete | 🔴 | MEDIUM |
| Edit | 🔴 | MEDIUM |

### API
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| RATELIMITS | 🟡 | MEDIUM |
| Other clients for forum via API | 🟢 | LOW |
| Get message**s** | 🟢 | MEDIUM |
| Send message | 🟢 | MEDIUM |
| Create thread | 🟢 | MEDIUM |
| Get info about thread | 🟢 | MEDIUM |
| Delete message & thread | 🟢 | HIGH |
| Edit message & thread | 🔴 | HIGH |

### Other
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Footer | 🟢 | LOW |
| auto-scroll  | 🟢 | LOW |
| Multi-theme support | 🔴 | LOW |
| Search | 🔴 | MEDIUM |
| Better view, page support, support message limit correct | 🔴 | MEDIUM |
| Sending message etc. will use fetch API | 🟢 | HIGH |

## Screenshot
![akf-forum](https://user-images.githubusercontent.com/70021050/160255959-ef216cba-1348-4d4b-9347-fe67e21348e7.png)
