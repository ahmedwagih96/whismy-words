const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes")
const { User, validateRegisterUser, validateLoginUser } = require("../models/user.model.js")
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

/**-----------------------------------------------------
    *@ desc Login User 
    * @route /api/auth/login
    * @method POST
    * @access public
-----------------------------------------------------*/

const loginUser = async (req, res) => {
    // validation
    const { error } = validateLoginUser(req.body)
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })
    }

    // is user exist 
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email or password" })
    }

    // check credentials
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email or password" })
    }

    // generate token (jwt)
    const token = user.generateToken();
    // response to client 
    res.status(StatusCodes.OK).json({
        id: user.id,
        isAdmin: user.isAdmin,
        image: user.profilePhoto.url,
        name: user.username,
        token,
    })
}


module.exports = { registerUser, loginUser }