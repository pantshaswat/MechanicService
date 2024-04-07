const router = require("express").Router();

const {
  register,
  signIn,
  signOut,
  getAllUsers,
  count,
  submitRequest,
  deleteUser
} = require("../controller/authController");
const { checkForCookieAuth } = require("../middlewares/jwtAuthMiddleware");
const authorizedTo = require('../middlewares/authorizationMiddleware')
router.post("/register", register);
router.post("/register", register);
router.post("/submitRequest", submitRequest);

router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.get("/checkCookieAuth", checkForCookieAuth("token"));
router.get("/getAllusers", getAllUsers);
router.delete("/delete/:_id",checkForCookieAuth('token'),authorizedTo(["Admin"]),deleteUser );
router.get("/count", count);

module.exports = router;
