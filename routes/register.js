const express = require('express');
const router = express.Router();
const cors = require('cors')
const stdRegController = require('../controllers/RegController/stdRegController');
const facultyRegController = require("../controllers/RegController/facultyRegController")
const adminRegController = require("../controllers/RegController/adminRegController")

router.use(cors())

router.post('/', (req, res) => {
    if (req.body.userType === "student")
        stdRegController.handleNewStudent(req, res)
    else if (req.body.userType === "faculty")
        facultyRegController.handleNewFaculty(req, res)
    else if (req.body.userType === "admin")
        adminRegController.handleNewAdmin(req, res)
});

module.exports = router;