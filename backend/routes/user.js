const express = require('express')

const userRoutes = express.Router()

const {users, loginUser, signupUser} = require('../controllers/userController')

userRoutes.get('/users', users)

userRoutes.post('/login', loginUser)

userRoutes.post('/signup', signupUser)

module.exports = userRoutes