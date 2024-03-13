const mongoose = require('mongoose')
const Schema = mongoose.Schema

const starSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    workoutnumber: {
        type: Number,
        required: true,
        default: 0
    },
    gold_stars: {
        type: Number,
        required: true,
        default: 0
    },
    platinum_stars: {
        type: Number,
        required: true,
        default: 0
    },
    startOfWeek: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Star = mongoose.model('Star', starSchema)
module.exports = Star;

