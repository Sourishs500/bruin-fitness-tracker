const express = require('express')
const router = express.Router()

const {
    createExercise,
    getAllExercises,
    getExercise,
    deleteExercise,
    updateExercise
} = require('../controllers/exerciseController')

// GET all workouts
router.get('/', getAllExercises)

// GET one workout
router.get('/:id', getExercise)

// POST a new workout
router.post('/', createExercise)

// DELETE a new workout
router.delete('/:id', deleteExercise)

// UPDATE a workout
router.patch('/:id', updateExercise)

module.exports = router