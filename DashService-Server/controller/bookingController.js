// controllers/appointmentsController.js
const Booking = require("../models/bookingModel");

exports.bookAppointment = async (req, res) => {
  try {
    const { userId, date, description, time, vehicleId, centerId } = req.body;

    const newBooking = await Booking.create({
      userId,
      bookingDate: date,
      description,
      bookingTime: time,
      vehicleId,
      centerId,
    });

    return res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.viewAppointments = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userBookings = await Booking.find({ userId });

    return res.status(200).json({ success: true, bookings: userBookings });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.requestRoadsideAssistance = (req, res) => {
  // Implementation for requesting roadside assistance
  // Implement the logic to handle the roadside assistance request
  res.json({ message: "Roadside assistance requested successfully" });
};
