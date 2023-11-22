const { User, validateUpdateUser } = require('../models/user.model.js');
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcryptjs');
const path = require("path");
const fs = require("fs")
const { cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveMultipleImage } = require('../utils/cloudinary')
const { Comment } = require("../models/comment.model.js");
const { Post } = require("../models/post.model.js");

/**-----------------------------------------------------
    * @desc Get All Users
    * @route /api/users/all
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
    * @desc Get User
    * @route /api/users/:id
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
    * @desc Update User
    * @route /api/users/:id
    * @method PUT
    * @access private (only user himself)
-----------------------------------------------------*/
const updateUser = async (req, res) => {
    const { error } = validateUpdateUser(req.body)
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    if (req.file) {
        // Get the path to the image 
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

        // Upload to cloudinary 
        const result = await cloudinaryUploadImage(imagePath)

        // Get the user from DB;
        const user = await User.findById(req.user.id)

        // Delete the old profile photo if exist 
        if (user.profilePhoto.publicId !== null) {
            await cloudinaryRemoveImage(user.profilePhoto.publicId)
        }

        req.body.profilePhoto = {
            url: result.secure_url,
            publicId: result.public_id,
        }
        // Remove image from the server 
        fs.unlinkSync(imagePath);
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio,
            profilePhoto: req.body.profilePhoto
        }
    }, {
        new: true
    }).select('-password')
    res.status(StatusCodes.OK).json({ message: 'Your profile has been updated', user })
}


/**-----------------------------------------------------
    * @desc  Delete User
    * @route /api/users/:id
    * @method DELETE
    * @access private (only admin or user)
-----------------------------------------------------*/
const deleteUser = async (req, res) => {
    // Get the user from DB
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "user not found" })
    }

    // Get all posts by the user 
    const posts = await Post.find({ user: user._id });

    // Get the public ids from the posts
    const publicIds = posts?.map((post) => post.image.publicId)

    // Delete all posts image from cloudinary that belong to this user
    if (publicIds.length > 0) {
        await cloudinaryRemoveMultipleImage(publicIds)
    }

    // Delete user profile photo if exists 
    if (user.profilePhoto.publicId !== null) {
        await cloudinaryRemoveImage(user.profilePhoto.publicId)
    }

    // Delete user posts & comments 
    await Post.deleteMany({ user: user._id })
    await Comment.deleteMany({ user: user._id })

    // Delete the user
    await User.findByIdAndDelete(req.params.id)

    // Send a response to the client
    res.status(StatusCodes.OK).json({ message: 'The profile has been deleted' })
}

module.exports = { getAllUsers, getUser, getUsersCount, deleteUser, updateUser }