//Importing Express
const express = require('express')

//Importing dotenv that allows to load environment variables from a .env file into process.env
require('dotenv').config() 

//Importing Mongoose to connect to the database on mongodb atlas
const mongoose = require('mongoose')

//Creating the Express App
const app = express() 

const router = express.Router()

//Middleware build into Express to parse incoming JSON requests
app.use(express.json());
//This middleware is built into Express and allows your app to parse JSON bodies from incoming requests.
app.use('/', router)

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

// Get Method to View the text 'Welcome'
router.get('/', (req,res) => {
    res.json('Welcome')
})
