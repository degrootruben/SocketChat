const { Pool, Client } = require("pg");



module.exports.loginUser = async (req, res) => {
    if (req.body.username && req.body.password) {
        res.status(200).send({ message: "Succesfully posted username and password" });
    } else {
        res.status(400).send({ error: "Error: no username or password was submitted" });
    }
}

module.exports.registerUser = async (req, res) => {
    const pool = new Pool({
        user: "spzkggifjzyakm",
        password: "a0f738e98f7070a92bf98aefa495e1498a927e9edfd277cc15b561db834cb54b",
        host: "ec2-52-21-252-142.compute-1.amazonaws.com",
        port: 5432,
        database: "d4f74sdqddblfg"
    });

    pool.query("SELECT NOW()", (err, res) => {
        console.log(err, res);
        pool.end();
    });

    res.end();
}

