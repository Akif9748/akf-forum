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
* [Akif9748](https://github.com/Akif9748) - Project mainteiner, main developer, made **old** frontend
* [Tokmak](https://github.com/tokmak0) - Made **new** frontend
* [Camroku](https://github.com/Camroku) - Made **old** stylesheets

## Screenshot
### Old frontend
![akf-forum](https://user-images.githubusercontent.com/70021050/160255959-ef216cba-1348-4d4b-9347-fe67e21348e7.png)
### New frontend
![image](https://user-images.githubusercontent.com/70021050/186941146-f9a8fbf8-9b2b-4028-afc8-81cff559d9fb.png)


## Roadmap
### TO-DO:
- If thread deleted, not show its messages in API.
- Thread.ejs fix with new theme
- Profile photos will store in database

### Frontend
### User
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Login via redirect query | 🟢 | HIGH |
| Register | 🟢 | HIGH |
| Logout | 🟢 | HIGH |
| Admin | 🟢 | HIGH |
| Message count | 🟢 | MEDIUM |
| Delete user | 🟢 | HIGH |
| Undelete | 🟢 | MEDIUM |
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
| Undelete | 🟡 | MEDIUM |
| React | 🟢 | MEDIUM |
| Edit | 🔴 | MEDIUM |

### Threads
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Ratelimit | 🟢 | HIGH |
| Create | 🟢 | HIGH |
| Delete | 🟢 | HIGH |
| Undelete | 🟢 | MEDIUM |
| Edit | 🔴 | MEDIUM |

### API
| To do | Is done? 
| ----- | -------- 
| RATELIMITS | 🟢 
| Get message**s** | 🟢 
| Create message & thread & user | 🟢 
| Get message & thread & user | 🟢 
| Delete message & thread & user | 🟢 
| Undelete message & thread & user | 🟢 
| Edit message & thread & user | 🔴 

### Other
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Footer | 🔴 | LOW |
| auto-scroll  | 🟢 | LOW |
| Multi-theme support, black theme | 🟡 | LOW |
| Search | 🔴 | MEDIUM |
| Page support, support message limit correct | 🔴 | MEDIUM |
| from form to AJAX | 🟢 | HIGH |

## Major Version History
- V3: New Theme
- V2: Backend fix, mongoose is fixed. Really big fix.
- V1: Mongoose added.
- V0: Birth with quick.db