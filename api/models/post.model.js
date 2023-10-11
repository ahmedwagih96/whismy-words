const mongoose = require("mongoose")
const { PostSchema } = require('../Schemas/postSchema')

const Post = mongoose.model("Post", PostSchema);


module.exports = { Post, validateUpdatePost }