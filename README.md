# akf-forum
<img src="https://raw.githubusercontent.com/Akif9748/akf-forum/main/public/images/logo.jpg" align="right" width="300px" />

A Node.js based forum software.

## Installation
- Clone or download this repo.
- Run `npm i` to install **dependencies**.
- Run `npm start` for run it. 

### Extra
Run `node util/reset` to **reset the database**, and run `node util/admin` for give admin perms to first member.
Edit `config.json` for default themes of users...

## API
Akf-forum has got an API for AJAX (fetch), other clients etc. And, you can learn about API in `util/APIDOCS.md`.

## Credits
* [Akif9748](https://github.com/Akif9748) - Project mainteiner, main developer, made **old** frontend
* [Tokmak](https://github.com/tokmak0) - Made **new** frontend
* [Camroku](https://github.com/Camroku) - Made **old** stylesheets

## Screenshot

### Thread Page w/Black Theme
![black-theme](https://user-images.githubusercontent.com/70021050/187899782-2ff010aa-0d39-4fc2-b00c-19bcf1623c8a.png)
### Threads Page w/Default Theme
![light-theme](https://user-images.githubusercontent.com/70021050/186941146-f9a8fbf8-9b2b-4028-afc8-81cff559d9fb.png)
<details>
  <summary><b>Mobile view</b></summary>
  <img src="https://user-images.githubusercontent.com/70021050/187901065-fd75ef85-56e3-42ce-8b34-cb8d799a6517.png"></img>
</details>

## Roadmap
### TO-DO:
| To do | Is done? | Priority |
| ----- | -------- | -------- |
| Profile Message | 🔴 | LOW |
| Search | 🔴 | MEDIUM |
| Footer | 🟡 | LOW |

- Better Auth
- Profile photos will store in a folder
- replacer function global
- page for threads - users 
- IPs of users will add SecretModel
- message counts for API
- better theme patch UserModel
- ajax, delete update thread dom

### API
| To do | Is done? 
| ----- | -------- 
| RATELIMITS | 🟢 
| Get a lots of message & thread & user | 🔴 
| Create message & thread & user | 🟢 
| Get message & thread & user | 🟢 
| Delete message & thread & user | 🟢 
| Undelete message & thread & user | 🟢 
| Edit message & thread & user | 🟢 

## Major Version History
- V4: Caching
- V3: New Theme
- V2: Backend fix, mongoose is fixed. Really big fix.
- V1: Mongoose added.
- V0: Birth with quick.db
