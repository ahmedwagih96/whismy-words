const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes")
const { User, validateRegisterUser, validateLoginUser } = require("../models/user.model.js");
const { VerificationToken } = require("../models/verificationToken.model.js");
const crypto = require('crypto');
const { sendVerifyEmail } = require('../utils/sendEmail.js')
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
    user = await User.create({ ...req.body });

    // Create Verification Token 
    const verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
    })

    await verificationToken.save()

    await sendVerifyEmail(user._id, verificationToken.token, user.email)

    // send response to client 
    res.status(StatusCodes.CREATED).json({ message: `We have sent an email to ${user.email}. Please activate your account!` })
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
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message })
    }

    // is user exist 
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password" })
    }

    // check credentials
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password" })
    }

    // if the account is not verified 
    if (!user.isAccountVerified) {
        let verificationToken = await VerificationToken.findOne({ userId: user._id })
        if (!verificationToken) {
            // Create Verification Token 
            verificationToken = new VerificationToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            })
            await verificationToken.save()
        }
        await sendVerifyEmail(user._id, verificationToken.token, user.email)
        res.status(StatusCodes.BAD_REQUEST).json({ error: `Email not Verified. We have sent an email to ${user.email}. Please activate your account then log in again!` })
    } else {
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
}

/**-----------------------------------------------------
    *@ desc Verify User Account 
    * @route /api/auth/:userId/verify/:token
    * @method GET
    * @access public
-----------------------------------------------------*/

const verifyUser = async (req, res) => {
    const { userId, token } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid link' });

    const verificationToken = await VerificationToken.findOne({
        userId,
        token
    })
    if (!verificationToken) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid link' });
    }

    user.isAccountVerified = true;
    await user.save();

    await VerificationToken.findByIdAndDelete(verificationToken._id)

    res.status(StatusCodes.OK).json({ message: 'Your account is verified' })
}

module.exports = { registerUser, loginUser, verifyUser }