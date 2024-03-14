This project is called the Bruin-fitness-tracker. This project is a fitness website where the user can track the workouts they have done. The user is able see the past workouts they have done and the user is able to generate a graph based on there workouts. The user can also generate workout reccomendations based on the muscle group they choose.This project utilizes mongoDb, express.js, node.js. 

Tips for starting up:

To start the backend:

1. cd backend
2. Have a .env file in the /backend, which includes the following lines:
PORT=port_that_you_are_hosting_backend_on
MONGO_URL=generated_mongo_url_from_mongodb_after_making_an_account
3. npm install -g nodemon
4. nodemon run dev

To start the frontend:

1. cd frontend
2. npm start
3. Install any dependencies you need with npm install.
4. npm start

Script for the frontend

#!/bin/bash

# Change directory to frontend
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Start the frontend
echo "Starting the frontend..."
npm start
