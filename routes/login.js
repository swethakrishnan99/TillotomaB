const express = require('express');
const router = express.Router();
const cors = require('cors')
const stdLoginController = require('../controllers/LoginController/stdLoginController')
const facultyLoginController = require('../controllers/LoginController/facultyLoginController')
const adminLoginController = require('../controllers/LoginController/adminLoginController')

router.use(cors())

router.post('/', (req, res) => {
    if (req.body.userType === "student")
        stdLoginController.handleLogin(req, res)
    else if (req.body.userType === "faculty")
        facultyLoginController.handleLogin(req, res)
    else if (req.body.userType === "admin")
        adminLoginController.handleLogin(req, res)
});

module.exports = router;