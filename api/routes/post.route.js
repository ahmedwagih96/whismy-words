const router = require('express').Router();
// Controllers 
const { getPostsByQueries } = require('../controllers/post.controller.js');


router.route('/')
    .get(getPostsByQueries)

module.exports = router