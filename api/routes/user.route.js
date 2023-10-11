const router = require('express').Router();
// Controllers 
const { getAllUsers, getUser } = require("../controllers/user.controller.js");
// Middleware
const { verifyTokenAndAdmin } = require("../middleware/authentication.js");
const { validateId } = require("../middleware/validateObjectId.js")
// Get All Users
router.route('/profile').get(verifyTokenAndAdmin, getAllUsers);
// Get Single User 
router.route('/profile/:id')
    .get(validateId, getUser)
module.exports = router;