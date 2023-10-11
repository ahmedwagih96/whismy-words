const mongoose = require("mongoose");
const { CommentSchema } = require("../schemas/comment.schema.js");


const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment }