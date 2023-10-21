const fastify = require("fastify")

const app = fastify({
    logger: true
})

app.get("/hello", (req, res) => {
    res.status(200).send({message: "Helo World!"})
})

module.exports = app