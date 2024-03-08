const router = require("express").Router();

const {
  register,
  signIn,
  signOut,
  getAllUsers,
} = require("../controller/authController");
const { checkForCookieAuth } = require("../middlewares/jwtAuthMiddleware");
router.post("/register", register);
router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.get("/checkCookieAuth", checkForCookieAuth("token"));
router.get("/getAllusers", getAllUsers);
module.exports = router;
