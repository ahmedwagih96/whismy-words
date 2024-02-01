const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a post title'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    description: {
        type: String,
        required: [true, 'Please provide a post description'],
        trim: true,
        minLength: 10,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please Provide a Post Category'],
    },
    image: {
        type: Object,
        default: {
            url: '',
            publicId: null,
        }
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

PostSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "postId",
    localField: "_id"

})
module.exports = { PostSchema }