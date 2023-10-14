const { Comment, validateCreateComment, validateUpdateComment } = require("../models/comment.model.js");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/user.model.js")

/**-----------------------------------------------------
    * @desc  Get All Comments
    * @route /api/comments
    * @method Get
    * @access private (only admin)
-----------------------------------------------------*/
const getAllComments = async (req, res) => {
    const comments = await Comment.find().populate("user", ['-password']);
    res.status(StatusCodes.OK).json(comments)
}

/**-----------------------------------------------------
    * @desc Delete Comment
    * @route /api/comments/:id
    * @method DELETE
    * @access private (only admin or comment owner)
-----------------------------------------------------*/
const deleteComment = async (req, res) => {
    // validate that the comment exists
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "comment not found" })
    }
    // validate that the comment is either deleted by the admin or the comment owner
    if (req.user.isAdmin || req.user.id === comment.user.toString()) {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json({ message: 'Comment has been deleted' })
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access Denied' })
    }
}

/**-----------------------------------------------------
    * @desc  Create New Comment
    * @route /api/comments
    * @method POST
    * @access private (only logged in user)
-----------------------------------------------------*/
const createComment = async (req, res) => {
    // validate
    const { error } = validateCreateComment(req.body);
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })
    }
    const profile = await User.findById(req.user.id);
    // create new comment
    const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username
    })
    // response to client 
    res.status(StatusCodes.CREATED).json({ message: 'New comment added', comment })
}

/**-----------------------------------------------------
    * @desc  Update Comment
    * @route /api/comments/:id
    * @method PUT
    * @access private (only comment owner)
-----------------------------------------------------*/

const updateComment = async (req, res) => {
    // check if the comment belongs to the user
    if (req.user.id !== comment.user.toString()) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Access Denied" })
    }
    // validate comment 
    const { error } = validateUpdateComment(req.body);
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })
    }
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found' })
    }

    // update comment
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            text: req.body.text
        }
    }, {
        new: true
    })
    // response to client 
    res.status(StatusCodes.OK).json({ message: 'Comment has been Updated', updatedComment })
}
module.exports = { getAllComments, deleteComment, createComment, updateComment }