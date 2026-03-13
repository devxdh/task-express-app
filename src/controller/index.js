const fs = require("node:fs")
const crypto = require("node:crypto")
const path = require("node:path")

const filepath = path.join(__dirname, '..', 'database', 'storage.json')

class Tasks {
    constructor(filepath) {
        this.filepath = filepath
    }

    read = () => {
        try {
            const content = fs.readFileSync(filepath, 'utf8');
            if (!content.trim()) return [];

            const parsed = JSON.parse(content);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch (err) {
            console.error(`Read Error: ${err}`);
            return [];
        }
    }

    writeFile = (taskArray, message) => {
        try {
            fs.writeFileSync(this.filepath, JSON.stringify(taskArray, null, 2))
            console.log(message);
        } catch (err) {
            console.error(`Write Error: ${err}`);
        }
    }

    parse = (taskName) => {
        return {
            id: crypto.randomUUID(),
            name: taskName,
            status: false,
            created_at: new Date().toISOString()
        };
    }
}

const task = new Tasks(filepath)
const data = task.parse("Dev")
console.log(data); 