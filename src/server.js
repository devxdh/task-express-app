const express = require("express");
const Logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(Logger);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World!" })
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});