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

module.exports = { getAllUsers }