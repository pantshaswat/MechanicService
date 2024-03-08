const router = require("express").Router();

const {
  register,
  signIn,
  signOut,
  getAllUsers,
  count,
  submitRequest,
} = require("../controller/authController");
const { checkForCookieAuth } = require("../middlewares/jwtAuthMiddleware");
router.post("/register", register);
router.post("/register", register);
router.post("/submitRequest", submitRequest);

router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.get("/checkCookieAuth", checkForCookieAuth("token"));
router.get("/getAllusers", getAllUsers);

router.get("/count", count);

module.exports = router;
