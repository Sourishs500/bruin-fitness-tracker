const express = require('express')
const router = express.Router()

const {
    createUser,
    getUser,
    updateProfilePhoto
} = require('../controllers/userController')

router.post('/createUser', createUser)

router.get('/getUser/:user', getUser)

router.post('/updateProfilePhoto', updateProfilePhoto)

module.exports = router