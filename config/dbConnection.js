const mongoose = require('mongoose');
const url = "mongodb+srv://swethakrishnan99:haritham@cluster0.sygsl.mongodb.net/portal?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(url)
    }
    catch (error) {
        console.error(error)
    }
}

module.exports = connectDB



