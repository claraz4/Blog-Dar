const express = require('express')

const userRoutes = express.Router()

const {loginUser, signupUser} = require('../controllers/userController')

userRoutes.post('/login', loginUser)

userRoutes.post('/signup', signupUser)

module.exports = userRoutes