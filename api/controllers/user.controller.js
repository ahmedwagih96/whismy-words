const { User } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes");

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
    const users = await User.find({}).select("-password").populate("posts")
    res.status(StatusCodes.OK).json(users)
}

/**-----------------------------------------------------
    * @desc Get user profile
    * @route /api/users/profile/:id
    * @method GET
    * @access public
-----------------------------------------------------*/
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "user not found" })
    }
    res.status(StatusCodes.OK).json(user)
}


module.exports = { getAllUsers, getUser }