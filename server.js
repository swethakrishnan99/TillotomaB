const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnection')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const bcrypt = require('bcrypt')
const PORT = process.env.PORT || 8000;

const app = express()
const login = require('./routes/login');
const register = require('./routes/register')
const students = require('./routes/students')

// connect to MongoDB
connectDB()

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());


app.use('/api/v1/login', login)
app.use('/api/v1/register', register)

app.use('/api/v1/students', students)
app.use('/api/v1/faculties', require('./routes/faculties'))
app.use('/api/v1/admin', require('./routes/admin'))
app.use('/api/v1/upload', require('./routes/upload'))


mongoose.connection.on('error', () => console.log("Error in connecting the database"))
mongoose.connection.once('open', () => console.log('connected to database'))

app.listen(PORT, console.log(`server is started on port ${PORT}`))