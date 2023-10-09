const router = require('express').Router();

const { registerUser } = require('../controllers/auth.controller.js')

router.route('/register').post(registerUser);

module.exports = router;