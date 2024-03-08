// controllers/appointmentsController.js
const Booking = require("../models/bookingModel");
const ServiceCenter = require("../models/serviceCenterModel");

//fetch service providers
exports.getAllServiceProviders = async (req, res) => {
  try {
    const serviceProviders = await ServiceCenter.find();
    return res.status(200).json({ success: true, serviceProviders });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

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

exports.viewAppointmentsAll = async (req, res) => {
  try {
    const allBookings = await Booking.find();

    return res.status(200).json({ success: true, bookings: allBookings });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.requestRoadsideAssistance = async (req, res) => {
  try {
    const { userId, description, location } = req.body;

    // Assuming you have a model named RoadsideAssistanceRequest
    const newRoadsideRequest = await RoadsideAssistanceRequest.create({
      userId,
      description,
      location,
      status: "Pending", // You can set an initial status
    });

    return res.status(201).json({ success: true, request: newRoadsideRequest });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
