# akf-forum
A Node.js based forum software.

## Installation
- Clone or download this repo.
- Run `npm i` to install **dependencies**.
- Enter your database credentials in `.env`.
- Run `npm start` for run it. 
- Go /setup page for setup your forum.

### Extra (If you are not use `setup` page)
Run `node util/reset` to **reset the database** for duplicate key errors, and run `node util/admin` for give admin perms to first member.
Edit `config.json` for default themes (`black` or `default`) of users, and forum name, meta description, character limits, discord auth enabler, global ratelimit.

### DISCORD AUTH: 
`"discord_auth": "your_app_id"` in config.json.
Add your app secret to `.env` as `DISCORD_SECRET`.
Create a redirect url in discord developer portal:
`https://forum_url.com/auth/discord`

### EMAIL AUTH:
You can configure it. Just edit `config.json` and `.env` files.
`"email_auth": true, "default_user_state": "APPROVAL"` in config.json.
Add your email credentials to `.env` as `EMAIL_USER` and `EMAIL_PASS`.
Add your email domain to `.env` as `EMAIL_SERVICE`.

## API
Akf-forum has got an API for AJAX (fetch), other clients etc. And, you can learn about API in `APIDOCS.md`.

**And you can use [offical API wrapper](https://github.com/Akif9748/akf-forum-api).**

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

## TO-DO list
- Profile Message or DM 
- mod role, permissions  
- upload other photos, model for it  
- change password.
- add approval threads page.
- Add a feature list to README.md
- delete admin???
- change category name
- theme support++, directly edit html! patch user support!
- enchanted theme: not take all of the public! "/css

### front-end
- better usermenu for user profile
- old contents / titles add to forum interface
- categories page is need a update, thread count in category (?) 
- add ban button to user profile.?
- who liked a message for web.
- give admin button

## Major Version History
- V5: Enchanted theme support
- V4: Caching
- V3: New Theme
- V2: Backend fix, mongoose is fixed. Really big fix.
- V1: Mongoose added.
- V0: Birth with quick.db
