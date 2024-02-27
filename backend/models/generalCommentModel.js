const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalCommentSchema = ({
    comment: {
        type: String,
        required: false
    }
});

const GeneralComment = mongoose.Model('GeneralComment', generalCommentSchema)
module.exports = GeneralComment;