const pg = require("pg")

const pool = new pg.Pool({
    user: "dev",
    host: "localhost",
    database: "taskdb",
    password: "postgres",
    port: 5432,
})

async function checkHealth() {
    const { rows } = await pool.query(`SELECT * FROM tasks`);
    console.log(rows);
}

module.exports = pool;