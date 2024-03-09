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
    const user = (req.body).User;

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
        const generalNotesDocument = await GeneralComment.create({comment: generalNotes, workoutId, date, user});
        // ret = res.status(200).json(generalNotesDocument);
    } catch (e){
        return res.status(400).json({error : e.message});
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
            exerciseDocument = await Exercise.create({name, sets: setsInfo, notes, workoutId, date, user})
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

// Get all workouts that were on a given date
const getAllWorkoutsOnDate = async (req, res) => {
    const d = req.params.date
    const finalDate = d.replaceAll('-', '/')

    console.log(finalDate)

    let generalComments = null;
    try{
        generalComments = await GeneralComment.find({ "date" : finalDate})
    } catch (e) {
        return res.status(400).json({error: e})
    }

    let workouts = null;

    try {
        workouts = await Exercise.find({ "date" : finalDate})
    } catch (e) {
        return res.status(400).json({error : e})
    }

    const ret = { "Date" : finalDate, "GeneralNotes" : generalComments, "Workout" : workouts}

    return res.status(200).json(ret)
}

//get sets and dates from name
const getWorkoutsOfName = async (req, res) => {
    const d = req.params.name
    //console.log(d)
    let workouts = null;
    try {
        workouts = await Exercise.find({"name" : d}).select('sets date -_id')
    } catch (e) {
        return res.status(400).json({error : e})
    }
    return res.status(200).json(workouts)
}

// get all exercise names
const getAllExerciseNames = async (req, res) => {
    const exercises = await Exercise.find({}).select('name -_id')
    const names = [...new Set(exercises.map(x => x['name']))]
    //console.log(exercises)
    res.status(200).json(names)
}

// Gets all dates of exercises
const getAllDates = async (req, res) => {

    try{    
        const dates = await GeneralComment.find({}).select('date -_id');
        return res.status(200).json(dates)
    } catch (e) {
        return res.status(400).send({error : e.message})
    }

}

// returns all workoutIDs
const getAllWorkoutIDs = async (req, res) => {
    let allIds = []
    try{
        const workoutIDs = await GeneralComment.find({}).select('workoutId')
        
        for(let i = 0; i < workoutIDs.length; i++){
            allIds.push(workoutIDs[i].workoutId)
        }

        return allIds
    } catch (e){
        return []
    }
}

// Need :group in the params
// Need user in JSON request
const getPastWorkoutsByMuscleGroup = async (req, res) => {
    const muscleWorkouts = {};

    muscleWorkouts['Push'] = ['Chest Press', 'Bench Press']
    muscleWorkouts['Pull'] = ['Preacher Curls', 'Lat Pull-Downs']
    muscleWorkouts['Legs'] = ['Wall-Sits', 'Calf Raises']

    const group = req.params.group
    const user = req.body.User

    const exerciseList = muscleWorkouts[group]

    const workoutList = Exercise.find({})

}

module.exports = {
    getAllExercises,
    getExercise,
    createExercise,
    deleteExercise,
    updateExercise,
    getAllDates,
    getAllWorkoutIDs,
    getAllWorkoutsOnDate,
    getWorkoutsOfName,
    getAllExerciseNames
}
