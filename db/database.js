const { Pool } = require("pg");
const { v4: uuid } = require("uuid");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports.connect = () => {
    pool.connect();
}

module.exports.end = () => {
    pool.end();
}

module.exports.getHashedPassword = (username, callback) => {
    pool.query("SELECT password FROM users WHERE username = $1", [username], async (error, response) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            callback(null, response.rows[0].password);
        }
    });
}

module.exports.getUserId = (username, hashedPassword, callback) => {
    pool.query("SELECT id FROM users WHERE username = $1 AND password = $2", [username, hashedPassword], (error, response) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            callback(null, response.rows[0].id);
        }
    });
}

module.exports.saveUser = ({ username, hashedPassword }, callback) => {
    const id = uuid();
    pool.query("INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *", [id, username, hashedPassword], (error, response) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            callback(null, { id: response.rows[0].id, username: response.rows[0].username });
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