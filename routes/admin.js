const express = require('express');
const admin = require('../model/adminSchema')
const router = express.Router();
const cors = require('cors')

router.get("/", (req, res) => {
    admin.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

module.exports = router