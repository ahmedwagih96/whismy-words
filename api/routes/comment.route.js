const router = require('express').Router()
// Controllers
const { getAllComments } = require('../controllers/comment.controller.js')
// Middleware
const { verifyTokenAndAdmin } = require("../middleware/authentication")

router.route("/")
    .get(verifyTokenAndAdmin, getAllComments)

module.exports = router