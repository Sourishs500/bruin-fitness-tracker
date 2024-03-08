const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema defines structure of a document in our database
// what should a typical Exercise look like?
const exerciseSchema = new Schema({
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
    },
    workoutId: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise;

// Returns all Exercises within Exercise collection
// Schema defines structure of documents we save to this collection/model
// Exercise.find()