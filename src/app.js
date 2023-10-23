const fastify = require("fastify")

//Repositories
const BookingRepository = require('./Repositories/BookingRepository')
const UserRepository = require('./Repositories/UserRepository')

// Services
const BookingServices = require('./Services/BookingServices')
const UserService = require("./Services/UserServices")

//Controllers
const BookingController = require("./Controller/BookingController")
const UserController = require("./Controller/UserController")

const app = fastify({
    logger: true
})

const bookingrepository = new BookingRepository()
const userRepository = new UserRepository()

const bookingServices = new BookingServices(bookingrepository)
const userServices = new UserService(userRepository)

const bookingController = new BookingController(bookingServices)
const userController = new UserController(userServices)



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

app.post("/api/users/create", (req, res) => {
    const { code, body } = userController.register(req)
    res.code(code).send(body)
})

module.exports = app