const Booking = require('../bookings/Booking')

class BookingService{
    constructor(repository){
        this.repository = repository
    }

    findAllBookings(){
        return  this.repository.findAll()
    }

    createBooking({ roomId, guestName, checkInDate, checkOutDate }){
        const newBooking = new Booking(roomId, guestName, checkInDate, checkOutDate )
        this.repository.create(newBooking)
        return newBooking
    }
}

module.exports = BookingService