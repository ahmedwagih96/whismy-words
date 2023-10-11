const router = require('express').Router();
// Controllers 
const { getAllUsers } = require("../controllers/user.controller.js");
// Middleware
const { verifyTokenAndAdmin } = require("../middleware/authentication.js");

// Get All Users
router.route('/profile').get(verifyTokenAndAdmin, getAllUsers);

module.exports = router;