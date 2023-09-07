
# Supply Chain Track and Trace

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


The Endpoints above can be tested using [this url](https://supply-chain-track-n-trace-api-f5ecf7eb7534.herokuapp.com/supplychain/api/v1/) hosted in Heroku or locally by setting up the app by following the commands below:-
NB: [These sample user accounts added here](https://github.com/daisyndungu/supply-chain-tracker-api/blob/dev/src/seed/seed.ts) can be used to test on both heroku and locally.

## INSTALLATION

These are the basic steps to install and run the application locally.

* Prerequisite

      npm(version >=9.8.1) or yarn 1.22.19
      Node version >= v16.17.0
      [MongoDB server (installed and running)](https://www.mongodb.com/docs/v4.0/installation/)

* Clone the application:

      git clone https://github.com/daisyndungu/supply-chain-tracker-api.git

* install requirements into virtualenv:

      cd supply-chain-tracker-api
      npm install

* Create a .env file and copy the contents of .env.example file into it. The new file should be in the root folder. Assign the variables in the .env file with their respective values
  
* To Create User accounts and items for testing purposes. This will create [sample user accounts added here](https://github.com/daisyndungu/supply-chain-tracker-api/blob/dev/src/seed/seed.ts). The user account can be used to log in and test the endpoints.

       npx ts-node ./src/seed/seed.ts
   
* Run server - npm/yarn or nodemon

       npm run dev
       or
       nodemon
* Navigate to http://localhost:3000/api-docs to view all the endpoint and their specification. The endpoint can be tested using Postman(base URL = http://localhost:3000/supplychain/api/v1). Also, [MongoDB Compas](https://www.mongodb.com/docs/compass/current/) is a handy tool for better visualization and managing data in MongoDB.
       
