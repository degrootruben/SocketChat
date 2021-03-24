const bcrypt = require("bcrypt");
const db = require("../db/database");
const jwt = require("jsonwebtoken");

db.connect();

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.userExists(username, async (error, exists) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "Database query created an error!" });
            }
            if (exists == true) {
                db.getHashedPassword(username, async (error, hashedPassword) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: "Database query created an error!" });
                    }

                    const match = await bcrypt.compare(password, hashedPassword);

                    if (match) {
                        db.getUserId(username, hashedPassword, (error, userId) => {
                            if (error) {
                                res.status(500).json({ error: "An error occured while querying database"});
                            }
                            const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

                            res.cookie("jwt", token);
                            res.status(200).json({ message: `User ${username} succesfully logged in!` });
                        });
                    } else {
                        res.status(400).json({ error: "Password incorrect!" });
                    }

                });
            } else {
                res.status(400).json({ error: "Username doens't exist!" });
            }
        });
    } else {
        res.status(400).send({ error: "Username and/or password was not submitted!" });
    }
}

module.exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.userExists(username, async (error, userExists) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "Database query created an error!" });
            }
            if (userExists) {
                res.status(400).json({ error: `Username '${username}' already in use!` });
            } else {
                const salt = await bcrypt.genSalt(6);
                const hashedPassword = await bcrypt.hash(password, salt);

                db.saveUser({ username, hashedPassword }, (error, user) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: "Database query created an error!" });
                    } else {
                        res.status(200).json({ message: `Created user ${username}!`, data: user });
                    }
                });
            }
        });
    } else {
        res.json({ error: "Username and/or password was not submitted!" });
    }
}

