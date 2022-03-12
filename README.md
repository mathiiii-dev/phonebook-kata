# Phonebook kata

## Getting Started

These instructions will get you a copy of the project up and running on your local machine if you want to test it or develop something on it.

## Installing

Follow those steps to make the project run on your machine

Clone the project :
```
git clone https://github.com/mathiiii-dev/phonebook-kata.git
```

## Backend

Install composer dependencies :
```
cd backend
```
```
composer require
```

### Database

First edit .env (or create a .env.local to override it) with your database credentials : 
```
DATABASE_URL="mysql://root:@127.0.0.1:3306/phonebook?serverVersion=5.7"
```

Create the database :
```
php bin/console doctrine:database:create
```

Update schema :
```
php bin/console doctrine:schema:update --force
```

### Launch backend

Using Symfony CLI :
```
symfony serve
```

or :
```
php bin/console server:start
```

## Frontend

Install dependencies :
```
cd frontend
```
```
npm i
```

### Launch frontend

```
npm run dev
```

### CORS
To avoid cors problem you can run :

```
lcp --proxyUrl http://127.0.0.1:8000
```

### API Environment Variables 

Change your API Environment Variables in the next.config.js to your api url

```javascript
module.exports = {
  env: {
    api: 'my-api-env',
  },
}
```

## Built With

* [Symfony](https://symfony.com/) - Framework PHP
* [NextJS](https://symfony.com/doc/current/testing.html) - Frontend framework
* [react-bootstrap](https://symfony.com/) - API Documentation

## Authors

* **Mathias Micheli** - *Student* - [Github](https://github.com/mathiiii-dev)

