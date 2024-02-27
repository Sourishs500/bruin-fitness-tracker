const mongoose = require('mongoose')
const User = require('../models/userModel.js');
const GeneralComment = require('../models/generalCommentModel.js');

const createUser = async (req, res) => {
    const {username, password, gender} = req.body;
    try {
        const user = await User.create({username, password, gender});
        user.save();
        return res.status(200).json(user);
    } catch(e) {
        return res.status(400).json({error: e.message})
    }
}

const getUser = async (req, res) => {
    // const { username } = req.params
    // if(!mongoose.Types.ObjectId.isValid(username)) { // if username we passed isn't valid:
    //     return res.status(404).json({error: 'Invalid username.'})
    // }
    // const user = await User.findById(username)
    // if(!user) {
    //     return res.status(404).json({error: 'No such user exists.'})
    // }
    // res.status(200).json(user)

    try {
        const exercises = await User.find('username').sort({createdAt: -1});
        return res.status(200).json(exercises)
    } catch(e){
        return res.status(400).json({error: e})
    }
}

module.exports = {
    createUser,
    getUser
}