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
        type: Number,
        required: true
    },
    mean: {
        type: Number,
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    stddev: {
        type: mongoose.Decimal128,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    totalreps: {
        type: Number,
        required: true
    },
    totalsets: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Statistics = mongoose.model('Statistics', statisticsSchema);
module.exports = Statistics;