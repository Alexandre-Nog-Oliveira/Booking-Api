const fastify = require("fastify")
const BookingRepository = require('./Repositories/BookingRepository')
const BookingServices = require('./Services/BookingServices')
const BookingController = require("./Controller/BookingController")

const app = fastify({
    logger: true
})

const bookingrepository = new BookingRepository()
const bookingServices = new BookingServices(bookingrepository)
const bookingController = new BookingController(bookingServices)


app.get("/", (req, res) => {
    res.status(200).send({message: "Helo World!"})
})

app.get("/api/bookings", (req, res) =>{
    const { code, body } = bookingController.index(req)
    res.code(code).send(body)
})

app.post("/api/bookings", (req, res) => {
    const { code, body } = bookingController.save(req)
    res.code(code).send(body)
})

module.exports = app