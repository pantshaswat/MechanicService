const router = require('express').Router();

const {register, signIn,signOut} = require('../controller/authController');

router.post('/register',register);
router.post('/signIn',signIn);
router.post('/signOut',signOut);

module.exports = router