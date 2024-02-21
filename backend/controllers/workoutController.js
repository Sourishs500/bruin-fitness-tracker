// this file makes the routes workouts.js file cleaner
// includes the function that routes will call

const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    // if id we passed in is not valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No such workout exists.'})
    }

    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {name, reps, sets, notes} = req.body

    // add a document
    try {
        // workout object represents workout object that was just created in MongoDB
        const workout = await Workout.create({name, reps, sets, notes})
        res.status(200).json(workout)
    } catch (error){
        // if creating the Workout document was not a success
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const deletedExercise = await Workout.findOneAndDelete({_id: id})

    if(!deletedExercise){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(deletedExercise)
}


// update a workout

const updateWorkout = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const updatedWorkout = await Workout.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!updatedWorkout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(updatedWorkout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}