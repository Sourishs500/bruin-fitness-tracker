const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false,
        default: "DefaultProfilePic.png"
    }
    stars: {
        type: Int,
        required: true,
        default: 0
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;