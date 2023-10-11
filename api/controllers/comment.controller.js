const { Comment } = require("../models/comment.model.js");
const { StatusCodes } = require("http-status-codes");

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

module.exports = { getAllComments }