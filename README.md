# MERN Stack Boilerplate

## Setup

#### Node

For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For Mac:
```
brew install node
```

#### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

#### React

```
npm install -g create-react-app
```

To create a new React app:
```
create-react-app name_of_app
```

To run the app, cd into the directory and do:
```
npm start
```

## Running the boilerplate

Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.

To create a database:
```
mongo
``` 
This will open the mongo shell. Type in ```use users``` to create a new database called users.

Run Express:
```
cd backend/
npm install
npm start
```

Run React:
```
cd frontend
npm install/
npm start
```
Navigate to localhost:3000/ in your browser.

### packages used for backend 
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "concurrently": "^5.1.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "is-empty": "^1.2.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.1",
    "mongoose-unique-validator": "^2.0.3",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "validator": "^12.2.0"

### packages used for frontend
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "axios": "^0.19.2",
    "bootstrap": "^4.4.1",
    "mongoose-unique-validator": "^2.0.3",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.3.1"


### Use case  
consider a vendor who wants to sell 100 pens as a bulk product for Rs. 150.
Different customers who want a pen can select this bundle and list the quantity that only he/she
wants - one customer might want 3 pens, another wants 5 and so on. Once the requirement of
100 pens is done, the vendor is able to see this in another view and can choose whether or not
to dispatch it. Once he dispatches it, this is removed from this view. Status on the customer
dashboard changes accordingly