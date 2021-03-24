const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports.getHashedPassword = (username, callback) => {
    pool.query("SELECT password FROM users WHERE username = $1", [username], async (error, response) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, response.rows[0].password);
        }
    });
}

module.exports.saveUser = ({ username, hashedPassword }, callback) => {
    pool.query("INSERT INTO users(username, password) VALUES($1, $2) RETURNING *", [username, hashedPassword], (error, response) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, { userid: response.rows[0].userid, username: response.rows[0].username });
        }
    });
}

module.exports.userExists = (username, callback) => {
    pool.query("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)", [username], async (error, response) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            if (response.rows[0].exists == true) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    });
}

module.exports.connect = () => {
    pool.connect();
}

module.exports.end = () => {
    pool.end();
}