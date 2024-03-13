const express = require('express')
const router = express.Router()

const {
    createUser,
    getUser,
    updateProfilePhoto,
    getStars
} = require('../controllers/userController')

router.post('/createUser', createUser)

router.get('/getUser/:user', getUser)

router.get('/getStars/:user', getStars)

router.post('/updateProfilePhoto', updateProfilePhoto)

module.exports = router