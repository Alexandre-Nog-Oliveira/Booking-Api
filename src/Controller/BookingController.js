class BookingController{
    constructor(service){
        this.service = service
    }

    index(request){
        const allBookings = this.service.findAllBookings()
        return { code: 200, body: { allBookings } }
    }

    save(req){
    const { roomId, guestName, checkInDate, checkOutDate } = req.body
        if(!roomId || !guestName || !checkInDate || !checkOutDate){
            return { code: 400, body: { message: "All fields are required."}}
        }

    const booking = this.service.createBooking({roomId, guestName, checkInDate, checkOutDate})
    return { code: 201, body: {message: "Booking created sucessfuly.", booking} }
    }
}

module.exports = BookingController