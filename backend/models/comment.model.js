const mongoose = require("mongoose");
const { CommentSchema } = require("../schemas/comment.schema.js");
const Joi = require('joi');

const Comment = mongoose.model("Comment", CommentSchema);

// Validate Create Comment
function validateCreateComment(obj) {
    const schema = Joi.object({
        postId: Joi.string().required(),
        text: Joi.string().trim().required()
    })
    return schema.validate(obj)
}

// Validate Update Comment
function validateUpdateComment(obj) {
    const schema = Joi.object({
        text: Joi.string().trim().required(),
    })
    return schema.validate(obj)
}

module.exports = { Comment, validateCreateComment, validateUpdateComment }