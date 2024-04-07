const router = require("express").Router();
const authorizedTo = require('../middlewares/authorizationMiddleware');

const {
  postNotification,
  getAllNotification,
  getUserNotification,
  notifyAllUsers,
} = require("../controller/notificationController");

router.post("/add/:_id", postNotification);
router.get("/getAll", getAllNotification);
router.get("/get/:_id", getUserNotification);
router.post("/add", notifyAllUsers);

module.exports = router;
