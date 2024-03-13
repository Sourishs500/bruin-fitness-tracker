const mongoose = require('mongoose')
const User = require('../models/userModel.js');
const GeneralComment = require('../models/generalCommentModel.js');

const weeks = ["2-25-2024", "3-3-2024", "3-10-24"];

const createUser = async (req, res) => {
    const {username, password, gender, image} = req.body;
    try {
        const user = await User.create({username, password, gender, "gold_stars": 0, "platinum_stars": 0, image});
        return res.status(200).json(user);
    } catch(e) {
        return res.status(400).json({error: e.message})
    }
}

const getUser = async (req, res) => {
    const username = req.params.user
    const user = await User.find({'username' : username})
    if(!user) {
        return res.status(404).json({error: 'No such user exists.'})
    }
    return res.status(200).json(user)
}

const updateProfilePhoto = async (req, res) => {
    const {name, URL} = req.body;
    try {
        const u = await User.updateOne({'username': name}, {$set: {'image': URL}}) 
        //console.log(u);
        return res.status(200).json(u);
    } catch(e) {
        return res.status(400).json({error: e.message});
    }
}

const getStars = async (req, res) => {
    const user = req.params.user
    try{
        const stars = await User.find({"username" : user}, 'gold_stars platinum_stars -_id')
        return res.status(200).json(stars)
    } catch (e) {
        return res.status(400).json({error : e.message})
    }
}

module.exports = {
    createUser,
    getUser,
    updateProfilePhoto,
    getStars
}