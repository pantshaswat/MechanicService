// routes/bookingsRoutes.js
const express = require("express");
const router = express.Router();
const bookingsController = require("../controller/bookingController");

// POST /bookings/book
router.post("/book", bookingsController.bookAppointment);

// GET /appointments/view/:userId
router.get("/view/:userId", bookingsController.viewAppointments);
router.get("/view", bookingsController.viewAppointmentsAll);
router.get("/getAllServiceProvider", bookingsController.getAllServiceProviders);

// POST /roadside-assistance/request
router.post(
  "/roadSideRequest",
  bookingsController.requestRoadsideAssistance
);

router.get('/getRequest/:_id',bookingsController.getRoadSideRequest)

module.exports = router;
