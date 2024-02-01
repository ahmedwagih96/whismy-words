const { StatusCodes } = require("http-status-codes")
const { User, validateEmail, validateNewPassword } = require("../models/user.model.js")
const { VerificationToken } = require("../models/verificationToken.model.js")
const crypto = require('crypto');
const { sendResetPasswordEmail } = require('../utils/sendEmail')
const bcrypt = require("bcryptjs");

/**-----------------------------------------------------
    * @desc Send Reset Password Link
    * @route /api/password/reset-password-link
    * @method POST
    * @access public
-----------------------------------------------------*/
const sendResetPasswordLink = async (req, res) => {
    // Validation
    const { error } = validateEmail(req.body)
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })
    // Get the user from DB by email
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User with given email does not exist' })

    // Checking if the user already have a verification token
    let verificationToken = await VerificationToken.findOne({
        userId: user._id
    })
    // If Verification Token does not Exist Create New One 
    if (!verificationToken) {
        // Create Verification Token 
        verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        })
        await verificationToken.save()
    }

    // send the reset password link by email
    await sendResetPasswordEmail(user._id, verificationToken.token, user.email)
    // Response to the client 
    res.status(StatusCodes.OK).json({ message: `We have sent an email to ${user.email}. Please reset your password!` })
}


/**-----------------------------------------------------
    * @desc Get Reset Password Link
    * @route /api/password/reset-password/:userId/:token
    * @method GET
    * @access public
-----------------------------------------------------*/
const getResetPasswordLink = async (req, res) => {
    const { userId, token } = req.params
    const user = await User.findById(userId);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid Link' })

    // Get the verification token
    const verificationToken = await VerificationToken.findOne({
        userId,
        token
    })
    if (!verificationToken) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid Link' })

    // response to client
    res.status(StatusCodes.OK).json({ message: 'Valid URL' })

}

/**-----------------------------------------------------
    * @desc Reset Password
    * @route /api/password/reset-password/:userId/:token
    * @method POST
    * @access public
-----------------------------------------------------*/
const resetPassword = async (req, res) => {
    // Validation
    const { error } = validateNewPassword(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })

    // Get The User
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid Link' })

    // Get the verification token
    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: req.params.token
    })
    if (!verificationToken) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid Link' });

    // If user is not verified, verify the account
    if (!user.isAccountVerified) user.isAccountVerified = true

    // set new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();

    // remove the token
    await VerificationToken.findOneAndDelete({
        userId: user._id,
        token: req.params.token
    })
    // response to client
    res.status(StatusCodes.OK).json({ message: 'Password reset successfully, please log in' })
}

module.exports = { sendResetPasswordLink, getResetPasswordLink, resetPassword }