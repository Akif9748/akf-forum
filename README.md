# akf-forum
<img src="https://raw.githubusercontent.com/Akif9748/akf-forum/main/public/images/logo.jpg" align="right" width="300px" />

A Node.js based forum software.

## Installation
- Clone this repo. Or download it.
- Write `npm i` to install **dependencies**.
- Write `npm restart` for **reset database**, and `npm start` for run it. 
- Note, the reset database is important!

## API
Akf-forum has got an API for other clients etc. You can test api with run apitest.py.
And, you can learn informations about API in `APIDOCS.md`.

## Credits
* [Akif9748](https://github.com/Akif9748) - Project owner, main developer
* [Camroku](https://github.com/Camroku) - Made stylesheets

## To Do (Backend, bug fixes) 
- Middleware. For logged in etc.
- Better error codes, example 400 for bad request
- Database change. (To MongoDB) 
- Better DB writing. Example, not `message.author.id`, `messsage.authorID`
- `/errors/error` will change, better error page.
- Support for not logins...
- message/react/:id ❌ message/:id/react ✔️

## Roadmap
- [x] User
  - [x] Login
  - [x] Register
  - [x] Logout
  - [x] Admin
  - [x] Message count
  - [x] Delete User
  - [ ] Singature & About me
  - [ ] Edit user
- [ ] Messages
  - [x] Ratelimit for sending message
  - [x] Send message
  - [x] Delete message
  - [ ] Edit message
  - [x] React message
- [ ] Threads
  - [x] Open it!
  - [ ] Edit it!
  - [ ] Delete it!
- [ ] Other
  - [x] API
  - [x] Other client for forum via API 
  - [x] Footer of the site
  - [ ] Multiple theme support 
  - [ ] Search 
  - [x] New Thread theme, better render for messages
  - [ ] sending message etc. Will turn api model
## Image:
![image](https://user-images.githubusercontent.com/70021050/160255959-ef216cba-1348-4d4b-9347-fe67e21348e7.png)

