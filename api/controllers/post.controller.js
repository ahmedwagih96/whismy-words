const { Post } = require('../models/post.model.js');
const { StatusCodes } = require("http-status-codes");

/**-----------------------------------------------------
    * @desc  Get All Posts
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
    * @desc  Get Post
    * @route /api/posts/:id
    * @method GET
    * @access public
-----------------------------------------------------*/
const getPost = async (req, res) => {
    const post = await Post.findById(req.params.id);

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

module.exports = { getPostsByQueries, getPost, getPostsCount }