// controllers/appointmentsController.js
const Booking = require("../models/bookingModel");
const ServiceCenter = require("../models/serviceCenterModel");
const ObjectId = require("mongoose").Types.ObjectId;
const userModel = require('../models/userModel')
const RoadsideAModel = require('../models/RoadsideAModel');
const serviceCenter = require("../models/serviceCenterModel");
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

    const userBookings = await Booking.find({ centerId: new ObjectId(userId) })
      .populate('userId') 
      .populate('vehicleId');
    return res.status(200).send(userBookings);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: err });
  }
};

exports.viewAppointmentsAll = async (req, res) => {
  try {
    const allBookings = await Booking.find({})
    .populate('userId')
    .populate('vehicleId');

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
    const userId = req.params._id;
    const {description, location,centerid } = req.body;

    // Assuming you have a model named RoadsideAssistanceRequest
    const newRoadsideRequest = await RoadsideAModel.create({
      userId,
      description,
      location,
      centerid,
    });

    return res.status(201).json({ success: true, request: newRoadsideRequest });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
exports.getRoadSideRequest = async (req,res) =>{
  try {
    const user_id = req.params._id;
    const serveCenter = await serviceCenter.findOne({ownerUserId: new ObjectId(user_id)});
    const assistanceRequests = await RoadsideAModel.find({centerid: serveCenter._id});
    if(!assistanceRequests) return res.status(404).send('No request Found')
    return res.status(200).send(assistanceRequests);
  } catch (error) {
    return res.status(400).send(`error: ${error}`);
  }
}