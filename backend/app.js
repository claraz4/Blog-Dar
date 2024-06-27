//Importing Express
const express = require('express')

//Importing dotenv that allows to load environment variables from a .env file into process.env
require('dotenv').config() 

//Importing Mongoose to connect to the database on mongodb atlas
const mongoose = require('mongoose')

//Creating the Express App
const app = express() 

const blogRoutes = require('./routes/blog')
const userRoutes = require('./routes/user')

//Middleware build into Express to parse incoming JSON requests
app.use(express.json());

app.use('/blogs', blogRoutes)

app.use('/user', userRoutes)

//Connect to the database
mongoose.connect(process.env.URI)
    .then(() => {
        // Start the server and listen on the specified port
        app.listen(process.env.PORT, () => {
            // Callback function that runs when the server starts listening
            console.log('Listening on port ', process.env.PORT)
            console.log('Connection to the Database is successful')
        })
    }).catch((error) => {
        console.log(error)
    })
