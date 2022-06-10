# Mjengo Technologies Limited

## Developer Interviews Phase II - Coding Challenge

## This is my submission for the Mjecngo Technologies Limited challenge

## A Mini full stack blog built using Laravel as a Backend and React/Tailwind/Typescript as a frontend

## Laravel Blog REST API with Sanctum

- Steps

cd ./blog-backend

- Change the *.env.example* to *.env* and add your database info

- Create a *database.sqlite* file in the *database* directory

DB_CONNECTION=sqlite
DB_HOST=127.0.0.1
DB_PORT=3306

- Run __composer install__
- Run __php artisan key:generate__
- Run __php artisan migrate --seed__ (it has some seeded data)

- Run __php artisan serve__

- Run __php artisan db:seed__ to create a super admin

- To prevent CORS errors add the following two lines in your .env file
SESSION_DOMAIN=api
SANCTUM_STATEFUL_DOMAINS=api

### Run the webserver on port 8000

## API endpoints

## Public

POST   /api/login
@body: email, password

POST   /api/register
@body: name, email, username, password, password_confirmation

## Protected

## users

GET /api/users

GET /api/users/{user}

GET /api/users/{user:username}/posts

## Posts

GET /api/posts

GET /api/posts/{post}

POST /api/posts/{post}
@body: title, slug, excerpt, body

DELETE /api/posts/{post}

POST /api/posts/update/{post}
@body: title, slug, excerpt, body

### Authentication

POST    /api/logout

Some Extra Features include roles and policies that limit users from deleting other users posts and one that only permits the admin from seeing a list of all users

## React Frontend Application built using React, Typescript and Tailwind CSS, interacting with a Laravel API backend

- Steps

cd ./blog-frontend

- Run __npm install__ to install dependencies

- Run __npm start__ to serve application

3rd party packages that I included are
moment, axios and react-router-dom

To access all pages, login as an admin using the credentials

    email: gichuivictor@gmail.com
    password: gichuivictor@gmail.com

Authentication and unauthorised routes
/
/login
/register

Authorised routes
/posts - view all posts
/profile - view your profile
/view/writer/:username -view blog author
/view/post/:id -view blog post
/edit/post/:id -edit blog post (only if you are the author)
/add/post - add a blog as the author
/logout

/writers - only the admin can get access to this page to view the writers

## Submitted by Victor Gichui Nyangi
