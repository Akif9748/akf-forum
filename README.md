# akf-forum
A Node.js based forum software.

## Installation
- Clone or download this repo.
- Run `npm i` to install **dependencies**.
- Enter your database credentials in `.env`.
- Run `npm start` for run it. 
- Go `/setup` page for setup your forum.

### Extra (If you are not use `setup` page)
Run `node util/reset` to **reset the database** for duplicate key errors, and run `node util/admin` for give admin perms to first member.
Edit `config.json` for default theme for users, forum name, meta description, character limits, discord auth enabler, global ratelimit etc.

### How to install theme:
- Copy your theme to `src/themes` folder.
Additional note for themes: If a theme has not got any .ejs file, it will use default theme's .ejs files. default theme is in themes folder, named as `common`.

### DISCORD AUTH: 
`"discord_auth": true` in config.json.
Add your app secret and app id to `.env` as `DISCORD_SECRET` and `DISCORD_ID`.
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

### Thread Page w/Bootstrap theme
![image](https://github.com/Akif9748/akf-forum/assets/70021050/1ad4ad8e-d000-46a6-834e-7d76cdddda60)

## TO-DO list

### Backend:
#### Feature:
- Profile Message or DM 
- Upload other photos, model for it
- Edit & download template 
- Banner
- Add @me support for ids, <%= member.id %>
- Roles & Permissions
```
role: "moderator",
permissions: ["see_deleted_message"]
```

#### Fixes:
- Admin deleting other admins.
- theme.js, change theme js code to a file.
- same email discord???? direct err
- IMPORTANT: add user/member id to file so scripts can access

#### ETC:
- Rewrite apidocs
- Add a feature list to README.md

### Frontend
#### Features:
- change category name
- Add approval threads page.
- add support for switch around gravatar and upload photo
- old contents / titles add to forum interface
- who liked a message

#### Fixes:
- BETTER SETUP PAGE: use setup everytime
- add threads, messages etc. to "extra" folder
- add category to thread list page
- working reset button
- text alling center body
- thread.js unfuction only listener
- show error on modal
- send delete, ban to user settings (edit user) menu and fix edit user menu

## Special Thanks:
https://github.com/akashgiricse/Online-Forum for bootstrap theme.

@Tokmak for old frontend.

https://fengyuanchen.github.io/cropperjs/examples/crop-a-round-image.html for avatar upload panel.

https://github.com/mdbootstrap/bootstrap-profiles for profile page of bootstrap theme.

## Major Version History
- V5: Enchanted Themes
- V4: Caching
- V3: New Theme
- V2: Backend fix, mongoose is fixed. Really big fix.
- V1: Mongoose added.
- V0: Birth with quick.db
