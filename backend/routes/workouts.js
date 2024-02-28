const express = require('express')
const router = express.Router()

const {
    createExercise,
    getAllExercises,
    getExercise,
    deleteExercise,
    updateExercise,
    getAllDates,
    getAllWorkoutIDs
} = require('../controllers/exerciseController')

// GET all workouts
router.get('/', getAllExercises)

router.get('/allWorkoutIDs', getAllWorkoutIDs)

// Get all dates of workouts
router.get('/allDates', getAllDates)

// GET one workout
router.get('/:id', getExercise)

// POST a new workout
router.post('/', createExercise)

// DELETE a new workout
router.delete('/:id', deleteExercise)

// UPDATE a workouts
router.patch('/:id', updateExercise)

module.exports = router