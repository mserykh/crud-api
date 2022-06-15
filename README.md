# Basic CRUD API

## Description

Simple CRUD API using in-memory database underneath.

## Project setup

- [Download & Install Git](https://git-scm.com/downloads)
- [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager
-Install dependencies

```bash
npm install
```

## Commands

Launch an app in development mode

```bash
npm start:dev
```

Launch an app in production mode

```bash
npm start:prod
```

Start multiple instances of the application

```bash
npm start:multi
```

## REST service docs

### Endpoints

`User` (`api/users` route)

- `GET` `api/users` - get all users
- `GET` `api/users/${userId}` - get the user be id (eg. "/users/uuid")
- `POST` `api/users` - create a new user
- `PUT` `api/users/${userId}` - update a user
- `DELETE` `api/users/${userId}` - delete a user

## Testing
