const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.loginPost);
router.get("/login", authController.loginGet);

router.post("/register", authController.registerPost);
router.get("/logout", authController.logoutGet);

module.exports = router;