const express = require('express')

require('dotenv').config()

const mongoose = require('mongoose')
//init app and middleware
const app = express()

const workoutRoutes = require('./routes/workouts')

const userRoutes = require('./routes/user')

app.use(express.json())

app.use('/workouts', workoutRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.Port, () => {
            console.log('Listening on port ', process.env.port)
        })
    }).catch((error) => {
        console.log(error)
    })