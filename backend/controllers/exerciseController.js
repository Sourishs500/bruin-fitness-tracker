// this file makes the routes workouts.js file cleaner
// includes the function that routes will call

const Exercise = require('../models/exerciseModel')
const GeneralComment = require('../models/generalCommentModel')
const mongoose = require('mongoose')
const { hash } = require('immutable')

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

    const date = (req.body).Date;
    const generalNotes = (req.body).GeneralNotes;
    const workout = (req.body).Workout;

    let sameDayWorkoutCount = 0;

    await (Exercise.countDocuments({date : date})).exec()
        .then((value) => {
            sameDayWorkoutCount = value;
        })
        .catch((e) => {
            return res.status(400).json({error : error.message});
        })

    const dateString = date + sameDayWorkoutCount;
    const workoutId = hash(dateString)

    // Add General Comment document
    try{
        const generalNotesDocument = await GeneralComment.create({comment: generalNotes, workoutId});
        // ret = res.status(200).json(generalNotesDocument);
    } catch (e){
        return res.status(400).json({error : error.message});
    }
    
    let exerciseDocument = null;
    // Add documents for each of the Exercises done in the Workout
    for(let i = 0; i < workout.length; i++){
        const name = workout[i].Exercise;
        const notes = workout[i].Notes;
        const setArray = workout[i].SetInformation;

        let setsInfo = "";
        for(let j = 0; j < setArray.length; j++){
            if(j === setArray.length - 1){
                setsInfo += setArray[j];
            } else {
                setsInfo += setArray[j] + ", ";
            }
        }

        try {
            exerciseDocument = await Exercise.create({name, sets: setsInfo, notes, workoutId, date})
            //ret = res.status(200).json(exerciseDocument)
        } catch (error){
            return res.status(400).json({error: error.message})
        }
    }
    return res.status(200).json(exerciseDocument);
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

// Gets all dates of exercises
const getAllDates = async (req, res) => {
    try{
        const exercises = await Exercise.find('date').sort({createdAt: -1});
        return res.status(200).json(exercises)
    } catch(e){
        return res.status(400).json({error: e})
    }
}

// returns all workoutIDs
const getAllWorkoutIDs = async (req, res) => {
    try{
        const workoutIDs = await GeneralComment.find({}).select('workoutId')
        return res.status(200).json(workoutIDs)
    } catch (e){
        return res.status(400).json({error: e})
    }
}

module.exports = {
    getAllExercises,
    getExercise,
    createExercise,
    deleteExercise,
    updateExercise,
    getAllDates,
    getAllWorkoutIDs
}