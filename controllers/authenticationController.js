const { Client } = require("pg");
const bcrypt = require("bcrypt");

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        client.query("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)", [username], async (error, response) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "Database query created an error!" });
            }
            if (response.rows[0].exists == true) {
                client.query("SELECT password FROM users WHERE username = $1", [username], async (error, response) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: "Database query created an error!" });
                    }

                    const match = await bcrypt.compare(password, response.rows[0].password);

                    if (match) {
                        res.status(200).json({ message: `User ${username} succesfully logged in!` });
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
        client.query("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)", [username], async (error, response) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "Database query created an error!" });
            }
            if (response.rows[0].exists == true) {
                res.status(400).json({ error: `Username '${username}' already in use!` });
            } else {
                const salt = await bcrypt.genSalt(6);
                const hashedPassword = await bcrypt.hash(password, salt);

                client.query("INSERT INTO users(username, password) VALUES($1, $2) RETURNING *", [username, hashedPassword], (error, response) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: "Database query created an error!" });
                    } else {
                        console.log(response);
                        res.status(200).json({ message: `Created user ${username}!`, data: { userid: response.rows[0].userid, username: response.rows[0].username } });
                    }
                });
            }
        });
    } else {
        res.json({ error: "Username and/or password was not submitted!" });
    }
}

