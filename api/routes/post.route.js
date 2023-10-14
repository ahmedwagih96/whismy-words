const router = require('express').Router();
// Controllers 
const { getPostsByQueries, getPost, getPostsCount } = require('../controllers/post.controller.js');
const { verifyAdmin } = require('../middleware/authentication.js');
const { validateId } = require('../middleware/validateObjectId.js');

// Get Posts By Queries 
router.route('/')
    .get(getPostsByQueries);
// Get All Posts Count
router.route('/count').get(verifyAdmin, getPostsCount)
// Get Posts By Id
router.route('/:id').get(validateId, getPost);

module.exports = router