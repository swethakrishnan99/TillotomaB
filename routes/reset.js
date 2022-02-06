const express = require("express");
const cors = require("cors");
const router = express.Router();
const resetController = require('../controllers/PasswordResetController/resetController')
router.use(cors())




router.put("/", resetController.resetPassword)
module.exports = router;
