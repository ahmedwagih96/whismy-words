const router = require('express').Router();

const { registerUser, loginUser, verifyUser } = require('../controllers/auth.controller.js')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify-user/:userId/:token').get(verifyUser);
module.exports = router;