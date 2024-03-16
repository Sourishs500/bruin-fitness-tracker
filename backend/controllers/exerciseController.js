// this file makes the routes workouts.js file cleaner
// includes the function that routes will call

const Exercise = require('../models/exerciseModel')
const GeneralComment = require('../models/generalCommentModel')
const Statistics = require('../models/statisticsModel')
const Star = require('../models/starModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const cryptojs = require('crypto-js')
const { hash } = require('immutable')

const decryptedUser = (enc) => {
    const decryptedUser = (cryptojs.AES.decrypt(enc.replaceAll("replacementdelimiter", "/"), "").toString(cryptojs.enc.Utf8)).split(" ")[0]
    return decryptedUser
}
// get all exercises
const getAllExercises = async (req, res) => {
    // Frontend 
    /* const userPass = "username" + " " + "password";
    let encrypted = cryptojs.AES.encrypt(userPass, "");
    encrypted = (encrypted.toString()).replace("/", "replacementdelimiter")
    // Frontend end
    console.log(encrypted)
    const decryptedUser = (cryptojs.AES.decrypt(encrypted.replace("replacementdelimiter", "/"), "").toString(cryptojs.enc.Utf8)).split(" ")[0]
    console.log(decryptedUser) */
    const user = decryptedUser(req.params.user)
    const exercises = await Exercise.find({"user" : user}).sort({createdAt: -1})

    res.status(200).json(exercises)
}

// get a single exercise, [not useful]
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

const inWeek = (date) => {
    const d = date.split('/')
    const month = parseInt(d[0])
    const day = parseInt(d[1])
    const year = parseInt(d[2])
    
    const inputDate = new Date(year, month, day);

    const weeks = ["2/18/2024", "2/25/2024", "3/3/2024", "3/10/2024", "3/17/2024"];
    
    for(let i = 1; i < weeks.length; i++){
        const cur = weeks[i].split('/')
        const curMonth = parseInt(cur[0]);
        const curDay = parseInt(cur[1])
        const curYear = parseInt(cur[2])

        const curDate = new Date(curYear, curMonth, curDay);
        if(inputDate < curDate){
            return weeks[i - 1];
        }
        /* if(year <= curYear){
            if(month <= curMonth){
                if(day < curDay){
                    return weeks[i - 1];
                }
            }
        } */
    }
    return "";
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

    const whichWeek = inWeek(date)
    const weeks = ["2/18/2024", "2/25/2024", "3/3/2024", "3/10/2024", "3/17/2024"];

    let gold_increment = 0;
    let plat_increment = 0;
    if(whichWeek != ""){
        try{
            const updatedStar = await Star.findOneAndUpdate({"user": user, "startOfWeek" : whichWeek}, {$inc: { workoutnumber: 1 }}, {upsert: true, new : true, setDefaultsOnInsert: true})

            if(updatedStar.workoutnumber == 3){
                gold_increment = 1;
                const updatedWithGold = await Star.findOneAndUpdate({"user": user, "startOfWeek" : whichWeek}, {$inc: { gold_stars : 1}}, {new: true})
                if(updatedWithGold){
                    const curIndex = weeks.indexOf(whichWeek);
                    let plat = true;
                    let alreadyPlat = false;
                    // Checking last two weeks in stars (plus current week)
                    for(let i = curIndex - 1; i >= curIndex - 2 && i >= 0; i--){
                        const check = await Star.findOne({"user": user, "startOfWeek" : weeks[curIndex]});
                        if(check.gold_stars === 0){
                            plat = false;
                        }
                        /* if(check.platinum_stars !== 0){
                            alreadyPlat = true;
                        } */
                    }
                    console.log("1")
                    console.log(plat)
                    if(!plat){
                        // Checking last week, current week, next week
                        for(let i = curIndex - 1; i <= curIndex + 1 && i >= 0 && i < weeks.length; i++){
                            const check = await Star.findOne({"user": user, "startOfWeek" : weeks[curIndex]});
                            if(check.gold_stars === 0){
                                plat = false;
                            }
                            /* if(check.platinum_stars !== 0){
                                alreadyPlat = true;
                            } */
                        }
                    }
                    console.log("2")
                    console.log(plat)
                    if (!plat){
                        // Checking next two weeks (plus current week)
                        for(let i = curIndex + 1; i <= curIndex + 2 && i < weeks.length; i++){
                            const check = await Star.findOne({"user": user, "startOfWeek" : weeks[curIndex]});
                            if(check.gold_stars === 0){
                                plat = false;
                            }
                            /* if(check.platinum_stars !== 0){
                                alreadyPlat = true;
                            } */
                        }
                    }
                    const numberOfWeeksCheck = await Star.countDocuments({"user" : user});
                    if (numberOfWeeksCheck < 3 ){
                        plat = false;
                    }
                    if(plat){
                        const updatedWithPlat = await Star.findOneAndUpdate({"user": user, "startOfWeek" : whichWeek}, {$inc : {platinum_stars : 1}}, {new : true})
                        plat_increment = 1;
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
        try{
            const updatedUser = await User.findOneAndUpdate({"username" : user}, {$inc : {gold_stars : gold_increment, platinum_stars : plat_increment}}, {new : true})
        } catch (e) {
            console.log(e)
        }
        
    }
    // Add General Comment document
    console.log("hi")
    console.log(generalNotes)
    try{
        if (generalNotes === "")
        {
            console.log("em")
            console.log(date)
            const generalNotesDocument = await GeneralComment.create({comment: " ", workoutId, date, user});
        }
        else
        {
            const generalNotesDocument = await GeneralComment.create({comment: generalNotes, workoutId, date, user});
        }
            
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
    const user = decryptedUser(req.params.user);

    console.log(finalDate)

    let generalComments = null;
    try{
        generalComments = await GeneralComment.find({ "date" : finalDate, "user" : user})
    } catch (e) {
        return res.status(400).json({error: e})
    }

    let workouts = null;

    try {
        workouts = await Exercise.find({ "date" : finalDate, "user":user})
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
    const user = decryptedUser(req.params.user)
    const exercises = await Exercise.find({"user" : user}).select('name -_id')
    const names = [...new Set(exercises.map(x => x['name']))]
    //console.log(exercises)
    res.status(200).json(names)
}

// Gets all dates of exercises
const getAllDates = async (req, res) => {
    const user = decryptedUser(req.params.user)
    try{    
        const dates = await GeneralComment.find({"user" : user}).select('date -_id');
        return res.status(200).json(dates)
    } catch (e) {
        return res.status(400).send({error : e.message})
    }

}

// returns all workoutIDs
const getAllWorkoutIDs = async (req, res) => {
    let allIds = []
    try{
        const workoutIDs = await GeneralComment.find({"user" : req.body.User}).select('workoutId')
        
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

const getStatistics = async (req, res) => {
    const user = decryptedUser((req.params).user);
    const exercisename = (req.params).exercise;
    const stattype = (req.params).stattype;
    console.log(stattype.concat(" -_id"))
    
    try{
        const stats = await Statistics.find({"user" : user, "exercisename" : exercisename}).select(stattype.concat(" date -_id"));
        console.log(stats)
        return res.status(200).json(stats)
    } catch (e) {
        return res.status(400).send({error : e})
    }
}

const createStatistics = async (req, res) => {
    const date = req.body.Date;
    const generalnotes = (req.body.GeneralNotes !== "") ? req.body.GeneralNotes : " ";
    const user = req.body.User;
    const workout = req.body.Workout;

    for(let i = 0; i < workout.length; i++){
        const cur = workout[i];
        const exercisename = cur.Exercise;
        const stats = cur.OverallStats;

        const max = stats.Max;
        const mean = stats.Mean;
        const min = stats.Min;
        const stddev = stats["Standard Deviation"];
        const sum = stats.Sum;
        const totalreps = stats["Total Reps"];
        const totalsets = stats["Total Sets"];

        try{
            const statisticsDoc = await Statistics.create({date, generalnotes, user, exercisename, max, mean, min, stddev, sum, totalreps, totalsets})
        } catch (e){
            return res.status(400).send({error : e})
        }
    }
    return res.status(200).send({"message" : "Successfully added statistics document"})
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
    getAllExerciseNames,
    getStatistics,
    createStatistics
}
