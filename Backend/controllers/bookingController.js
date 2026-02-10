import Booking from "../models/bookingModel.js";

export const createBooking = async (req,res)=>{
    try {
        const {id} = req.user;
        const {name, numberOfPeople, phone, date, time} = req.body;
        if(!name || !numberOfPeople || !phone || !date || !time){
            return res.status(400).json({message: "All fields are required", success: false});
        }

        //check for overlapping bookings
        const existingBooking = await Booking.findOne({
            date,time,
            status: { $ne: "cancelled" },
        });
        if(existingBooking){
            return res.status(400).json({message: "Time slot is already booked", success: false});
        }
        const newBooking = await Booking.create({
            user: id,
            name,numberOfPeople,phone,date,time
        })
        return res.status(201).json({message: "Booking created successfully", success: true, booking: newBooking});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server error", success: false });
    }
}

export const getUserBooking = async (req,res)=>{
    try {
        const {id} = req.user;
        const bookings = await Booking.find({user: req.user.id}).sort({createdAt: -1});
        res.status(200).json({message: "Bookings retrieved successfully", success: true, bookings});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server error", success: false });
    }
}

export const getAllBookings = async (req,res)=>{
    try {
        const bookings = await Booking.find().populate("user", "name email").sort({createdAt: -1});
        res.status(200).json({message: "Bookings retrieved successfully", success: true, bookings});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server error", success: false });
    }
}

export const updateBookingStatus = async (req,res)=>{
    try {
        const {bookingId} = req.params;
        const {status} = req.body;
        const booking = await Booking.findById(bookingId);
        if(!booking){
            return res.status(404).json({message: "Booking not found", success: false});
        }
        booking.status = status;
        await booking.save();
        res.status(200).json({message: "Booking status updated", success: true, booking});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal server error", success: false });
    }
}