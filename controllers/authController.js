const bcrypt = require("bcrypt");
const db = require("../db/database");
const jwt = require("jsonwebtoken");

db.connect();

module.exports.loginPost = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.userExists(username, async (error, exists) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "An error occured while querying database" });
            }
            if (exists == true) {
                db.getHashedPassword(username, async (error, hashedPassword) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: "An error occured while querying database" });
                    }

                    const match = await bcrypt.compare(password, hashedPassword);
                    if (match) {
                        db.getUserId(username, hashedPassword, (error, id) => {
                            if (error) {
                                console.error(error);
                                res.status(500).json({ error: "An error occured while querying database" });
                            }

                            const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 259200 });
                            res.cookie("JWT", token, { httpOnly: true, maxAge: 259200 * 1000 });
                            res.status(200).json({ loggedIn: true, message: `User ${username} succesfully logged in!` });
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

module.exports.loginGet = (req, res) => {
    if (req.cookies.JWT) {
        const token = req.cookies.JWT;

        jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
            if (error) {
                res.status(401).json({ error: "You are not logged in or not authorized!", err: error });
            } else {
                res.status(200).json({ loggedIn: true, id: result.id, message: "User is logged in!" });
            }
        });
    } else {
        res.status(401).json({ error: "You are not logged in or not authorized!!!" });
    }
}


module.exports.registerPost = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.userExists(username, async (error, userExists) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "An error occured while querying database" });
            }
            if (userExists) {
                res.status(400).json({ error: `Username '${username}' already in use!` });
            } else {
                const salt = await bcrypt.genSalt(6);
                const hashedPassword = await bcrypt.hash(password, salt);

                db.saveUser({ username, hashedPassword }, (error, user) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: "An error occured while querying database" });
                    }
                    db.getUserId(username, hashedPassword, (error, id) => {
                        if (error) {
                            console.error(error);
                            res.status(500).json({ error: "An error occured while querying database" });
                        }

                        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 259200 });
                        res.cookie("JWT", token, { httpOnly: true, maxAge: 259200 * 1000 });
                        res.status(200).json({ loggedIn: true, message: `Created user ${username}!`, data: user });
                    });

                });
            }
        });
    } else {
        res.json({ error: "Username and/or password was not submitted!" });
    }
}

module.exports.logoutGet = (req, res) => {
    res.cookie("JWT", "", { maxAge: 1 });
    res.json({ message: "User logged out!" });
}

