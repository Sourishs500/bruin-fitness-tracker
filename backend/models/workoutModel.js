const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema defines structure of a document in our database
// what should a typical workout look like?
const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    }
}, { timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)

// Returns all workouts within Workout collection
// Schema defines structure of documents we save to this collection/model
// Workout.find()