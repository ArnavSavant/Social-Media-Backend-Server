# Social Media Platform Backend

This backend project for a social media platform is implemented using Node.js, Express, Sequelize, and MySQL. It follows key coding principles and project management recommendations, providing a solid foundation for similar projects. Feel free to adapt it to your specific requirements.

## Project Structure

`src` -> The `src` folder contains all the actual source code of the project. It does not include any tests, which should be in a separate folder.

### Inside the `src` folder:

- **config** -> This folder contains configurations and setup for libraries or modules. Examples include:
  - `server-config.js` -> Sets up `dotenv` for environment variables.
  - `logger-config.js` -> Sets up the logging library configuration.
  - `config.json` -> Contains the database configuration settings.
- **controllers** -> This folder contains the controllers which receive incoming requests, call the business layer, and structure the API response.
  - `auth-controller.js`
  - `comment-controller.js`
  - `info-controller.js`
  - `like-controller.js`
  - `post-controller.js`
  - `user-controller.js`
  - `index.js` -> Exports all controllers for easy access.
- **middlewares** -> Contains middleware functions that intercept incoming requests for validation, authentication, etc.
  - `auth-middleware.js`
  - `index.js` -> Exports all middleware functions for easy access.
- **migrations** -> Contains all migration files that define changes to be applied to the database schema. Each migration file is timestamped and includes methods for applying (`up`) and reverting (`down`) the changes.
  - `20240517101702-create-user.js`
  - `20240518082702-create-follow.js`
  - `20240518083537-add-foreign-key-associations-to-follows.js`
  - `20240518094849-create-post.js`
  - `20240518122037-create-like.js`
  - `20240518123312-add-noOfLikes-to-posts.js`
  - `20240518141517-create-comment.js`
  - `20240518141829-add-noOfComments-to-posts.js`
  - `20240518185229-add-commentsEnabled-to-posts.js`
  - `20240519000000-add-scheduledAt-and-isPublished-to-posts.js`
- **models** -> Defines the structure of database tables and their relationships using Sequelize.
  - `comment.js`
  - `follow.js`
  - `index.js` -> Initializes and exports all models.
  - `like.js`
  - `post.js`
  - `user.js`
- **repositories** -> Contains logic for interacting with the database using raw queries or ORM queries.
  - `comment-repository.js`
  - `crud-repository.js`
  - `follow-repository.js`
  - `index.js` -> Exports all repositories for easy access.
  - `like-repository.js`
  - `post-repository.js`
  - `user-repository.js`
- **routes** -> Registers routes and the corresponding middleware and controllers.
  - **v1**
    - `auth-routes.js`
    - `comment-routes.js`
    - `index.js` -> Aggregates all v1 routes.
    - `post-routes.js`
    - `user-routes.js`
- **seeders** -> Contains all seeder files that define the data to be inserted into the database tables.
- **services** -> Contains business logic and interacts with repositories for database operations.
  - `auth-service.js`
  - `comment-service.js`
  - `index.js` -> Exports all services for easy access.
  - `like-service.js`
  - `post-service.js`
  - `scheduler.js` -> Contains the cron job for scheduling posts.
  - `user-service.js`
- **utils** -> Contains helper methods, error classes, etc.
  - **common**
    - `auth.js`
    - `error-response.js`
    - `index.js` -> Exports all common utilities.
    - `success-response.js`
  - **errors**
    - `app-error.js` -> Custom application error class.
  - **helper**
    - `datetime-helper.js` -> Helper methods for date and time operations.
    - `index.js` -> Exports all helper utilities.

### Setup the project

- Download the project and open it in your favorite text editor.
- Go inside the folder path and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  `PORT=<port number of your choice>`
  `SALT_ROUNDS=<salt rounds for encryption of the password>`
  `JWT_SECRET=<secret key of the JWT token>`
  `JWT_EXPIRY=<expiry duration of the JWT token>`
  ex:

  `PORT = 3000`
  `SALT_ROUNDS=8`
  `JWT_SECRET='jwt_secret_12321@#@'`
  `JWT_EXPIRY=1h`

- go inside the `src` folder and execute the following command:
  ```
    npx sequelize init
  ```
- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.
- If you're setting up your development environment, then write the username of your database, password of your database and in dialect mention whatever database you are using for ex: mysql, mariadb etc
- If you're setting up test or prod environment, make sure you also replace the host with the hosted database url.
- To create the database:
```
  npx sequelize db:create
```
- To apply the migrations and create the necessary tables in your database, run:
```
npx sequelize db:migrate
```

- To run the server execute

```
npm run dev
```
