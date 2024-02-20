// routes/bookingsRoutes.js
const express = require("express");
const router = express.Router();
const bookingsController = require("../controller/bookingController");

// POST /bookings/book
router.post("/book", bookingsController.bookAppointment);

// GET /bookings/view/:userId
// router.get("/view/:userId", bookingsController.viewbookings);

module.exports = router;
