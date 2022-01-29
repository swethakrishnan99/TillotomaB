const mongoose = require('mongoose')
const schema = mongoose.Schema

var validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const facultySchema = new schema({
    name: {
        required: "Name is required",
        type: String
    },
    email: {
        type: String,
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    },
    phone: {
        type: String,
        required: "Phone Number is required"
    },
    password: {
        type: String,
        required: true,

    },
    dob: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String
    },
    nationality: {
        type: String,
        required: true
    },
    countryOfResidence: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("faculties", facultySchema)