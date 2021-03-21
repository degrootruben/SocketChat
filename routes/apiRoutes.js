const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
    if (req.body.username && req.body.password) {
        res.status(200).send({ message: "Succesfully posted username and password" });
    } else {
        res.status(400).send({ error: "Error: no username or password was submitted" });
    }
});

module.exports = router;