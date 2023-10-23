const mongoose = require("mongoose")
const { PostSchema } = require('../schemas/post.schema.js')

const Post = mongoose.model("Post", PostSchema);

function validateUpdatePost(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200).required(),
        description: Joi.string().trim().min(10).required(),
        category: Joi.string().trim().required()
    })
    return schema.validate(obj)
}
module.exports = { Post, validateUpdatePost }