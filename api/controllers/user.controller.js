const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes");
const { Post } = require("../models/post.model.js");

/**-----------------------------------------------------
    * @desc Get All Users
    * @route /api/users/profile
    * @method GET
    * @access private (only admin)
-----------------------------------------------------*/
const getAllUsers = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access Denied' })
    }
    const users = await User.find({}).select("-password");
    res.status(StatusCodes.OK).json(users)
}

/**-----------------------------------------------------
    * @desc Get user profile
    * @route /api/users/profile/:id
    * @method GET
    * @access public
-----------------------------------------------------*/
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password").populate({
        path: 'posts',
        options: { sort: { createdAt: -1 } },
        populate: { path: 'user', select: '-password' }
    })
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "user not found" })
    }
    res.status(StatusCodes.OK).json(user)
}

/**-----------------------------------------------------
    * @desc Get Users Count
    * @route /api/users/count
    * @method GET
    * @access private (only admin)
-----------------------------------------------------*/
const getUsersCount = async (req, res) => {
    const count = await User.count()
    res.status(StatusCodes.OK).json(count)
}

/**-----------------------------------------------------
    * @desc  Delete User Profile
    * @route /api/users/profile/:id
    * @method DELETE
    * @access private (only admin or user)
-----------------------------------------------------*/
const deleteUser = async (req, res) => {
    // Get the user from DB
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "user not found" })
    }

    // Delete user posts & comments 
    await Post.deleteMany({ user: user._id })
    await Comment.deleteMany({ user: user._id })

    // Delete the user
    await User.findByIdAndDelete(req.params.id)

    // Send a response to the client
    res.status(StatusCodes.OK).json({ message: 'The profile has been deleted' })
}

module.exports = { getAllUsers, getUser, getUsersCount, deleteUser }