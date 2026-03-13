const fs = require("node:fs")
const crypto = require("node:crypto")
const path = require("node:path")

class Task {
    constructor() {
        this.filepath = path.join(__dirname, '..', 'database', 'storage.json')
    }

    readAll = async () => {
        const content = await fs.promises.readFile(this.filepath, 'utf8');
        if (!content.trim()) return [];
        const parsed = JSON.parse(content)
        return Array.isArray(parsed) ? parsed : [parsed]
    }

    find = async (taskID) => {
        const taskArray = await this.readAll()
        const taskFound = await taskArray.find(task => task.id === taskID)
        if (!taskFound) throw new Error(`No Task Found with ID:${taskID}`);
        return taskFound;
    }

    writeFile = async (taskArray) => {
        await fs.promises.writeFile(this.filepath, JSON.stringify(taskArray, null, 2))
        console.log(`Success: ${taskArray}`);
    }

    parse = (taskName) => {
        return {
            id: crypto.randomUUID(),
            name: taskName,
            status: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    }

    addTask = async (task) => {
        let taskArray = await this.readAll()
        const newTask = this.parse(task)
        taskArray.push(newTask)
        await this.writeFile(taskArray)
        return newTask;
    }

    updateTask = async (taskID) => {
        const taskArray = await this.readAll()
        const index = taskArray.findIndex(task => task.id === taskID)

        if (index === -1) throw new Error(`Task with ID ${taskID} does not exist.`);
        taskArray[index].status = true;
        taskArray[index].updated_at = new Date().toISOString()

        await this.writeFile(taskArray)
        return taskArray[index]
    }

    deleteTask = async (taskID) => {
        const taskArray = await this.readAll()
        const updatedArray = taskArray.filter(task => task.id !== taskID)
        if (updatedArray.length === taskArray.length) {
            console.log(`No Task found to delete with name ${taskName}`);
            return;
        }
        await this.writeFile(updatedArray)
    }
}

module.exports = Task;