const express = require("express");
const authenticationController = require("../controllers/authenticationController");

const router = express.Router();

// Authentication
router.post("/login", authenticationController.loginUser);
router.post("/register", authenticationController.registerUser);

module.exports = router;