const express = require("express")
const Tasks = require("../controller/db_controller")

const task = new Tasks()
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const allTasks = await task.getTask()
        if (allTasks.length === 0) res.status(404).json({ message: `No tasks found!` });
        res.status(200).json(allTasks)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { taskName } = req.body
        if (!taskName) {
            res.status(404).json({ message: "No taskName provided" })
        }
        const addedTask = await task.addTask(taskName)
        res.status(201).json(addedTask)
    } catch (err) {
        next(err)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const { taskId } = req.body
        if (!taskId) {
            res.status(404).json({ message: "No taskId provided." })
        }
        const updatedTask = await task.updateTask(taskId)
        res.status(200).json(updatedTask)
    } catch (err) {
        next(err)
    }
})

router.delete('/', async (req, res, next) => {
    const { taskId } = req.body
    if (!taskId) {
        res.status(404).json({ message: "No taskId provided." })
    }
    const deletedTask = await task.deleteTask(taskId)
    res.status(204).json(deletedTask)
})

module.exports = router;