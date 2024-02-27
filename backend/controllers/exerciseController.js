// this file makes the routes workouts.js file cleaner
// includes the function that routes will call

const Exercise = require('../models/exerciseModel')
const mongoose = require('mongoose')

// get all exercises
const getAllExercises = async (req, res) => {
    const exercises = await Exercise.find({}).sort({createdAt: -1})

    res.status(200).json(exercises)
}

// get a single exercise
const getExercise = async (req, res) => {
    const { id } = req.params

    // if id we passed in is not valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const exercise = await Exercise.findById(id)

    if(!exercise){
        return res.status(404).json({error: 'No such workout exists.'})
    }

    res.status(200).json(exercise)
}

// create new exercise
const createExercise = async (req, res) => {
    const {name, sets, notes} = req.body

    // add a document
    try {
        // exercise object represents exercise object that was just created in MongoDB
        const exercise = await Exercise.create({name, sets, notes})

        res.status(200).json(exercise)
    } catch (error){
        // if creating the Workout document was not a success
        res.status(400).json({error: error.message})
    }
}

// delete an exercise
const deleteExercise = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const deletedExercise = await Exercise.findOneAndDelete({_id: id})

    if(!deletedExercise){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(deletedExercise)
}


// update an exercise
const updateExercise = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const updatedExercise = await Exercise.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!updatedExercise){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(updatedExercise)
}

module.exports = {
    getAllExercises,
    getExercise,
    createExercise,
    deleteExercise,
    updateExercise
}