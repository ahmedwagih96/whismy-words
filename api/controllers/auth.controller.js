const { StatusCodes } = require("http-status-codes")
const { User, validateRegisterUser } = require("../models/user.model.js")
const bcrypt = require("bcryptjs");
/**-----------------------------------------------------
    * @desc Register New User 
    * @route /api/auth/register
    * @method POST
    * @access public
-----------------------------------------------------*/

const registerUser = async (req, res) => {
    // Validation
    const { error } = validateRegisterUser(req.body)
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })
    }
    // check if user already exists 
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(StatusCodes.CONFLICT).json({ message: 'user already exist' })
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    // Create New User 
    user = await User.create({ ...req.body })

    // send response to client 
    res.status(StatusCodes.CREATED).json({ message: `Account Created` })
}


module.exports = { registerUser }