const mongoose = require('mongoose')
const User = require('../models/userModel.js');
const GeneralComment = require('../models/generalCommentModel.js');

const createUser = async (req, res) => {
    const {username, password, gender} = req.body;
    try{
        const user = await User.create({username, password, gender});
        return res.status(200).json(user);
    }catch(e){
        return res.status(400).json({error: e.message})
    }
}


module.exports = {
    createUser
}