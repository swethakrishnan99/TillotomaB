const express = require('express');
const faculty = require('../model/facultySchema')
const router = express.Router();
const cors = require('cors')

router.get("/", (req, res) => {
    faculty.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

module.exports = router