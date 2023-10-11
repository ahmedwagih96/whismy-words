const router = require('express').Router();
// Controllers 
const { getAllUsers, getUser, getUsersCount } = require("../controllers/user.controller.js");
// Middleware
const { verifyTokenAndAdmin } = require("../middleware/authentication.js");
const { validateId } = require("../middleware/validateObjectId.js")
// Get All Users
router.route('/profile').get(verifyTokenAndAdmin, getAllUsers);
// Get Single User 
router.route('/profile/:id')
    .get(validateId, getUser)
// Get All Users Count 
router.route('/count').get(verifyTokenAndAdmin, getUsersCount);

module.exports = router;