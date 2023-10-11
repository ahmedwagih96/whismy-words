const mongoose = require("mongoose")
const { PostSchema } = require('../schemas/post.schema.js')

const Post = mongoose.model("Post", PostSchema);


module.exports = { Post }