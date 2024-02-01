const router = require('express').Router();
// Controllers 
const { getPostsByQueries, getPost, getPostsCount, updatePost, deletePost, createPost, toggleLike, getAllPosts } = require('../controllers/post.controller.js');
const { verifyAdmin, verifyToken } = require('../middleware/authentication.js');
const { validateId } = require('../middleware/validateObjectId.js');
const { photoUpdate, photoUpload } = require("../middleware/mediaHandling.js");

router.route('/')
    .get(getPostsByQueries)
    .post(verifyToken, photoUpload.single("image"), createPost);

router.route('/count').get(verifyAdmin, getPostsCount)
router.route('/all-posts').get(verifyAdmin, getAllPosts)
// CRUD 
router.route('/:id')
    .get(validateId, getPost)
    .put(validateId, verifyToken, photoUpdate.single('image'), updatePost)
    .delete(validateId, verifyToken, deletePost);
// Likes 
router.route("/like/:id").put(validateId, verifyToken, toggleLike);
module.exports = router