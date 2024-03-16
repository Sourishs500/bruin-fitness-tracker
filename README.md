Group member names: Sourish Saswade, Aryan Gupta, Lara Smarandoiu, Sparsh Johri, Arunan Elamaran, Marvin Mok

This project is called the Bruin-fitness-tracker. This project is a fitness website where the user can track the workouts they have done. The user is able see the past workouts they have done and the user is able to generate a graph based on there workouts. The user can also generate workout reccomendations based on the muscle group they choose.This project utilizes mongoDb, express.js, node.js. 


Note: We have a shell script in the repository called script_to_start that starts up our web app.

Link to public GitHub repo (for submission) : https://github.com/Sourishs500/bruin-fitness-tracker.git

After cloning this repo, you must add a .env file to the backend folder. This file contains sensitive info and thus we did not include it in the repository. PORT is configured as 4000. We've given instructions to our TA about the MONGO_URL.

PORT=port_that_you_are_hosting_backend_on
MONGO_URL=generated_mongo_url_from_mongodb_after_making_an_account


Shell instructions to begin the app (included in script_to_start):

cd frontend/frontend

echo "Installing frontend dependencies..."
npm install

cd ../../backend
echo "Installing backend dependencies..."
npm install dotenv --save

echo "Starting the backend..."
nodemon run dev &

cd ../frontend/frontend
echo "Starting the frontend..."
npm start


