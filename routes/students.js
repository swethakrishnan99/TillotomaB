const express = require('express');
const student = require('../model/studentSchema')
const router = express.Router();
const cors = require('cors')

router.get("/", (req, res) => {
    student.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

module.exports = router
