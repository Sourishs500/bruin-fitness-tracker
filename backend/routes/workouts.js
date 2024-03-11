const express = require('express')
const router = express.Router()

const {
    createExercise,
    getAllExercises,
    getExercise,
    deleteExercise,
    updateExercise,
    getAllDates,
    getAllWorkoutIDs,
    getAllWorkoutsOnDate,
    getWorkoutsOfName,
    getAllExerciseNames
} = require('../controllers/exerciseController')

// GET all workouts (changed)
router.get('/:user', getAllExercises)

// Helper
router.get('/allWorkoutIDs', getAllWorkoutIDs)

// Get all dates of workouts (changed)
router.get('/allDates/:user', getAllDates)

// Get all workouts corresponding to a date (changed)
router.get('/:date/:user', getAllWorkoutsOnDate)

// Get all workouts corresponding to a workout type, Helper
router.get('/name/:name', getWorkoutsOfName)

// Helper
router.get('/names/getAllExerciseNames/:user', getAllExerciseNames)

// GET one workout
router.get('/:id', getExercise)

// POST a new workout
router.post('/', createExercise)

// DELETE a new workout
router.delete('/:id', deleteExercise)

// UPDATE a workouts
router.patch('/:id', updateExercise)

module.exports = router
