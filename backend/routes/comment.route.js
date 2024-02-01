const router = require('express').Router()
// Controllers
const { getAllComments, deleteComment, updateComment, createComment } = require('../controllers/comment.controller.js')
// Middleware
const { verifyAdmin, verifyToken } = require("../middleware/authentication")
const { validateId } = require("../middleware/validateObjectId.js")

router.route("/")
    .get(verifyAdmin, getAllComments)
    .post(verifyToken, createComment)

router.route('/:id')
    .delete(validateId, verifyToken, deleteComment)
    .put(validateId, verifyToken, updateComment)
module.exports = router