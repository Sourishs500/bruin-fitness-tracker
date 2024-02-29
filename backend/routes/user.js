const express = require('express')
const router = express.Router()

const {
    createUser,
    getUser
} = require('../controllers/userController')

router.post('/createUser', createUser)

router.get('/getUser/:user', getUser)

module.exports = router