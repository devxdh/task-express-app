const pool = require("../database/db")

class Tasks {
    addTask = async (taskTitle) => {
        if (!taskTitle) throw new Error(`No Task Name provided`);
        const addQuery = `INSERT INTO tasks (title) VALUES ($1) RETURNING *`;
        const res = await pool.query(addQuery, [taskTitle])
        return res.rows[0]
    }

    getTask = async () => {
        const res = await pool.query(`SELECT * FROM tasks`);
        return res.rows;
    }

    updateTask = async (taskId) => {
        if (!taskId && !typeof taskId === 'number') throw new Error(`Invalid taskId`);
        const updateQuery = `UPDATE tasks SET status=true WHERE id=$1 RETURNING *`;
        const updatedTask = await pool.query(updateQuery, [taskId])
        return updatedTask.rows[0];
    }

    deleteTask = async (taskId) => {
        if (!taskId && !typeof taskId === 'number') throw new Error(`Invalid taskId`);
        const deleteQuery = `DELETE FROM tasks WHERE id=$1 RETURNING *`;
        const deletedTask = await pool.query(deleteQuery, [taskId])
        return deletedTask.rows[0]
    }
}

module.exports = Tasks;