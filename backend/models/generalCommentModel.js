const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalCommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    workoutId: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const GeneralComment = mongoose.model('GeneralComment', generalCommentSchema)
module.exports = GeneralComment;
