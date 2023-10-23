const router = require('express').Router();
// Controllers 
const { getAllUsers, getUser, getUsersCount, deleteUser, updateUser } = require("../controllers/user.controller.js");
// Middleware
const { verifyAdmin, verifyUserAccess } = require("../middleware/authentication.js");
const { validateId } = require("../middleware/validateObjectId.js")
const { photoUpdate } = require("../middleware/mediaHandling.js");
router.route('/profile').get(verifyAdmin, getAllUsers);
router.route('/profile/:id')
    .get(validateId, getUser)
    .delete(validateId, verifyUserAccess, updateUser)
    .put(validateId, verifyUserAccess, photoUpdate.single("image"), deleteUser)
router.route('/count').get(verifyAdmin, getUsersCount);

module.exports = router;