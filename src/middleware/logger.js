const Logger = (req, res, next) => {
    const method = req.method;
    const url = req.url
    const time = new Date().toISOString();

    console.log(`Time [${time}] Method: [${method}] URL: [${url}]`);

    next()
}

module.exports = Logger;