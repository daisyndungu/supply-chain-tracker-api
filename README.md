
# cp2-BucketList-Application
Supply Chain Track and Trace

The building blocks are:
  * NodeJS
  * Typescript
  * MongoDB

EndPoint | Functionality
------------ | -------------
POST /register | Create a new user account.
POST /login | Authenticate an existing user by their email address and password and generate a token
POST /items  | Create a new item
GET /items | Returns all the items created by and in current custody of the user
GET /items?isCustodian=true | Returns all the items in the user's custody but not owned by them
GET /items/:id | Get a single item by id
PATCH /item/:id | Updates item properties
POST /item/:id/events | Creates a new Item Event and updates the custodian of the items(Assigns item custody to the user creating the event).
GET /item/:id/events | Returns all the events trail of an item.
GET /item/:id/events?lastEvent=true | Returns the last event of an item.

## INSTALLATION

These are the basic steps to install and run the application locally.

* Prerequisite

      >> npm(version >=9.8.1) or yarn 1.22.19 installed
      >> Node version >= v16.17.0

* Clone the application:

      >> git clone https://github.com/daisyndungu/supply-chain-tracker-api.git

* install requirements into virtualenv:

      >> cd supply-chain-tracker-api
      >> git checkout dev
      >> npm install

* Create a .env file and copy the contents of .env.example file into it. The new file should be in the root folder. Assign the variables in the .env file with they respective values
  
 * To Create User accounts and items for testing purposes. This will create [sample account add here](https://github.com/daisyndungu/supply-chain-tracker-api/blob/dev/src/seed/seed.ts). The user account can be used to log in and test the endpoint.

       >> ts-node ./src/seed/seed.ts
   
 * Run server - npm/yarn or nodemon

       >> npm start
       or
       >> nodemon
* Navigate to http://localhost:3000/api-docs to view all the endpoint and their specification. The endpoint can be tested using Postman(base URL = http://localhost:3000/supplychain/api/v1). Also, [MongoDB Compas](https://www.mongodb.com/docs/compass/current/) is a handy tool for better visualization and managing data in MongoDB.
       
