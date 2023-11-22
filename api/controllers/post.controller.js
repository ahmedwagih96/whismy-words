const fs = require("fs");
const path = require("path");
const { Post, validateUpdatePost } = require('../models/post.model.js');
const { Comment } = require("../models/comment.model.js")
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../utils/cloudinary');
const { StatusCodes } = require("http-status-codes");

/**-----------------------------------------------------
    * @desc  Get Posts By Queries 
    * @route /api/posts
    * @method GET
    * @access public
-----------------------------------------------------*/
const getPostsByQueries = async (req, res) => {
    const { category, sort } = req.query
    const queryObject = {};

    if (category) {
        queryObject.category = category
    }

    let results = Post.find(queryObject);


    if (sort) {
        results = results.sort('createdAt');
    } else {
        results = results.sort('-createdAt')
    }

    const page = Number(req.query.pageNumber) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    results = results.skip(skip).limit(limit)

    const posts = await results.populate("user", ['-password']);


    const count = Post.find(queryObject).count()
    const postsCount = await count;

    res.status(StatusCodes.OK).json({ posts, postsCount })
}

/**-----------------------------------------------------
    * @desc  Get All Posts
    * @route /api/posts/all-posts
    * @method GET
    * @access private (only admin)
-----------------------------------------------------*/
const getAllPosts = async (req, res) => {
    const posts = await Post.find({}).populate("user", ['-password'])
    res.status(StatusCodes.OK).json(posts)
}
/**-----------------------------------------------------
    * @desc  Get Post
    * @route /api/posts/:id
    * @method GET
    * @access public
-----------------------------------------------------*/
const getPost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate("user", ['-password']).populate({
        path: 'comments',
        populate: { path: 'user', select: '-password' }
    })

    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' })
    }
    res.status(StatusCodes.OK).json(post)
}

/**-----------------------------------------------------
    * @desc  Get Posts Count 
    * @route /api/posts/count
    * @method GET
    * @access Private (only admin)
-----------------------------------------------------*/
const getPostsCount = async (req, res) => {
    const postsCount = await Post.count()
    res.status(StatusCodes.OK).json(postsCount)
}

/**-----------------------------------------------------
    * @desc  Create New Post
    * @route /api/posts
    * @method POST
    * @access private (only logged in user)
-----------------------------------------------------*/
const createPost = async (req, res) => {
    const {
        body: { title, description, category },
        user: { id: user },
        file
    } = req;

    // Validation For Image
    if (!file) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "no image is provided" })
    }

    // Upload Photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await cloudinaryUploadImage(imagePath);

    // Create new post and save it to DB
    await Post.create({
        title,
        description,
        category,
        user,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })

    // Send Response to the client
    res.status(StatusCodes.CREATED).json({ message: 'New Post Created' });

    // Remove Image from the Server
    fs.unlinkSync(imagePath)
}

/**-----------------------------------------------------
    * @desc  Delete Post
    * @route /api/posts/:id
    * @method Delete
    * @access private (only post owner or admin)
-----------------------------------------------------*/
const deletePost = async (req, res) => {
    // Validate The Post
    const post = await Post.findById(req.params.id)
    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' })
    }
    // Check if post owner or admin will delete the comment
    if (req.user.isAdmin || req.user.id === post.user.toString()) {
        // Delete The Post
        await Post.findByIdAndDelete(req.params.id);
        // Delete The Post Image from Cloudinary
        await cloudinaryRemoveImage(post.image.publicId)
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Access Denied' })
    }

    // Delete all comments that belong to this post
    await Comment.deleteMany({ postId: post._id });

    // Delete The Post
    res.status(StatusCodes.OK).json({ message: 'Post has been deleted successfully' })
}

/**-----------------------------------------------------
    * @desc  Update Post
    * @route /api/posts/:id
    * @method PUT
    * @access private (only post owner)
-----------------------------------------------------*/
const updatePost = async (req, res) => {
    // Validation 
    const { error } = validateUpdatePost(req.body)
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })
    }
    // Get the post from DB and check if post exist
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'The post does not exist' })
    }

    // check if this post belong to logged in user 
    if (req.user.id !== post.user.toString()) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access Denied' })
    }
    if (req.file) {
        // Delete the old image 
        await cloudinaryRemoveImage(post.image.publicId)

        // Upload the new image 
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
        const result = await cloudinaryUploadImage(imagePath);
        req.body.image = {
            url: result.secure_url,
            publicId: result.public_id
        }
        // Remove image from the server
        fs.unlinkSync(imagePath)
    }
    // update the post
    const { title, description, category, image } = req.body;

    await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            title,
            description,
            category,
            image
        }

    }, { new: true }).populate("user", ["-password"])

    res.status(StatusCodes.OK).json({ message: 'Post has been updated' })
}


/**-----------------------------------------------------
    * @desc  Toggle Like
    * @route /api/posts/like/:id
    * @method PUT
    * @access private (only logged in user)
-----------------------------------------------------*/
const toggleLike = async (req, res) => {

    const {
        params: { id: postId },
        user: { id: loggedInUser }
    } = req;

    // Get the post by Id
    let post = await Post.findById(postId)
    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Post not found" })
    }

    // Check if the user already liked the post 
    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === loggedInUser);

    if (isPostAlreadyLiked) {
        // if post is already liked ==> unlike the post 
        post = await Post.findByIdAndUpdate(postId,
            {
                $pull: { likes: loggedInUser },
            },
            { new: true }
        )
    } else {
        // if the post is not liked ==> like the post 
        post = await Post.findByIdAndUpdate(postId,
            {
                $push: { likes: loggedInUser },
            },
            { new: true }
        )
    }
    res.status(StatusCodes.OK).json(post)

}


module.exports = { getPostsByQueries, getPost, getPostsCount, createPost, deletePost, updatePost, toggleLike, getAllPosts }