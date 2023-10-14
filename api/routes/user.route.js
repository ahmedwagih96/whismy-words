const router = require('express').Router();
// Controllers 
const { getAllUsers, getUser, getUsersCount } = require("../controllers/user.controller.js");
// Middleware
const { verifyAdmin } = require("../middleware/authentication.js");
const { validateId } = require("../middleware/validateObjectId.js")
// Get All Users
router.route('/profile').get(verifyAdmin, getAllUsers);
// Get Single User 
router.route('/profile/:id')
    .get(validateId, getUser)
// Get All Users Count 
router.route('/count').get(verifyAdmin, getUsersCount);

module.exports = router;