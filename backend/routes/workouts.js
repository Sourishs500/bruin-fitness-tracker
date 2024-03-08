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
    getWorkoutsOfType
} = require('../controllers/exerciseController')

// GET all workouts
router.get('/', getAllExercises)

router.get('/allWorkoutIDs', getAllWorkoutIDs)

// Get all dates of workouts
router.get('/allDates', getAllDates)

// Get all workouts corresponding to a date
router.get('/:date', getAllWorkoutsOnDate)

// Get all workouts corresponding to a workout type
router.get('/:workout', getWorkoutsOfType)

// GET one workout
router.get('/:id', getExercise)

// POST a new workout
router.post('/', createExercise)

// DELETE a new workout
router.delete('/:id', deleteExercise)

// UPDATE a workouts
router.patch('/:id', updateExercise)

module.exports = router