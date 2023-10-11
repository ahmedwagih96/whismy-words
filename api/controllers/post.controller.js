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

module.exports = { getPostsByQueries }