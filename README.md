![Group 174](https://user-images.githubusercontent.com/104751512/186152036-215d0ee8-d68f-45d6-9968-9b5c0361d624.png)

# Description

Financial management is strategic planning, organising, directing, and controlling of financial undertakings in an organisation or an institute. It also includes applying management principles to the financial assets of an organisation, while also playing an important part in fiscal management.

## Contributors

- [@pong-sun](https://github.com/pong-sun) 

## Installation

Clone my-project with github

```bash
  git clone https://github.com/pong-sun/bajet
```

## Environment Variables

To run this project locally, you will need to add the following environment variables to .env file in the back-end folder.
If .env file does not exist just create a new one and add this ff:

```javascript
APP_NAME=Laravel
APP_ENV=local
APP_KEY= // Generate a new key
APP_DEBUG=true
APP_URL=http://127.0.0.1

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bajet
DB_USERNAME=root
DB_PASSWORD=
```

Make sure to create a Database based on the DB_DATABASE value.
If you want to test the SMTP don't forget to add credentials too in .env file with your Mailtrap or own SMTP credentials.

## Run Locally

After cloning the project

Go to the project directory

```bash
  cd bajet
```

## Commands for running the Front End

From the Root folder install dependencies for the Front End

```bash
  cd frontend
  npm install
```

Start the Front End Server

```bash
  npm run start
```

## Commands for running the Back End

From the Root folder install dependencies for the Back End

```bash
  cd backend
  composer install
  php artisan migrate:fresh --seed
```

Optimize the back end (optional)

```bash
  php artisan config:clear
  php artisan cache:clear
  php artisan route:clear
  php artisan optimize
  composer dump-autoload
```

Start the Back End Server

```bash
  php artisan serve
```

## Appendix

Any additional information goes here
