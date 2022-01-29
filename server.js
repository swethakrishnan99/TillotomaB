const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnection')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const bcrypt = require('bcrypt')
const PORT = process.env.PORT || 8000;

const app = express()

// connect to MongoDB
connectDB()

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());


// app.use('api/v1/students', require('./routes/students'))
// app.use('api/v1/faculties', require('./routes/faculties'))
// app.use('api/v1/adminRoute', require('./routes/admin'))
app.use('/api/v1/register', require('./routes/register'))
app.use('/api/v1/login', require('./routes/login'))

mongoose.connection.on('error', () => console.log("Error in connecting the database"))
mongoose.connection.once('open', () => console.log('connected to database'))

app.listen(PORT, console.log(`server is started on port ${PORT}`))