const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    generalnotes: {
        type: String,
        required: true
    },
    user : {
        type: String,
        required: true
    },
    exercisename: {
        type: String,
        required: true
    },
    max: {
        type: Integer,
        required: true
    },
    mean: {
        type: Integer,
        required: true
    },
    min: {
        type: Integer,
        required: true
    },
    stddev: {
        type: Double,
        required: true
    },
    sum: {
        type: Integer,
        required: true
    },
    totalreps: {
        type: Integer,
        required: true
    },
    totalsets: {
        type: Integer,
        required: true
    }
}, { timestamps: true })

const Statistics = mongoose.model('Statistics', statisticsSchema);
module.exports = Statistics;