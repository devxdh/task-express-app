const express = require("express")
const Task = require("../controller/index")

const task = new Task()
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const taskArray = await task.readAll()
        res.status(200).json(taskArray)
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
    await task.deleteTask(taskId)
    res.status(204).json({ message: `Task deleted Successfully with ID:${taskId}` })
})

module.exports = router;