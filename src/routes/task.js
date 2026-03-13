const express = require("express")
const fs = require("node:fs")

const filepath = "../database/storage.json"
const router = express.Router()

router.get('/task', (req, res) => {
})

module.exports = router;