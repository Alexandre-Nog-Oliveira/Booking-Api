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

app.get("/api/bookings", {preHandler: (req, res, done ) =>{
    const token = req.headers.authorization ?.replace(/^Bearer/, "")
    if(!token) res.code(401).send({message: "Unauthorized: token missing"})

    const user = userServices.verifyToken(token)
    if(!user) res.code(404).send({message: "Unauthorized: invalid token."})
    req.user = user;
    done()
    
}} ,(req, res) =>{
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

app.post("/api/user/login", (req, res) => {
    const { code, body } = userController.login(req)
    res.code(code).send(body)
})

module.exports = app