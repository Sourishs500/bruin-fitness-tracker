require('dotenv').config()

const express = require('express')

// makes the express app
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')


// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests once we've connected to the database
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port 4000')
    })

    db = mongoose.Connection.prototype.db;
})
.catch((error) => {
    console.log(error)
})

