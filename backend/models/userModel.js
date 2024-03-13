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
    gold_stars: {
        type: Number,
        required: false,
        default: 0
    },
    platinum_stars: {
        type: Number,
        required: false,
        default: 0
    },
    image: {
        type: String,
        required: true,
    }
    
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;