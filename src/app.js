const fastify = require("fastify")
const BookingRepository = require('./Repositories/BookingRepository')
const BookingServices = require('./Services/BookingServices')

const app = fastify({
    logger: true
})

const bookingrepository = new BookingRepository()
const bookingServices = new BookingServices(bookingrepository)

app.get("/hello", (req, res) => {
    res.status(200).send({message: "Helo World!"})
})

app.get("/api/bookings", (req, res) =>{
    const allBookings = bookingServices.findAllBookings()
    res.status(200).send(allBookings)
})

app.post("/api/bookings", (req, res) => {
    const { roomId, guestName, checkInDate, checkOutDate } = req.body

    const booking = bookingServices.createBooking({roomId, guestName, checkInDate, checkOutDate})
    res.status(201).send({message: "Booking created sucessfuly.", booking})
})

module.exports = app