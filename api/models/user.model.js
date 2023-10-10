const mongoose = require("mongoose");
const { UserSchema } = require("../schemas/user.schema.js");
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')
const User = mongoose.model("User", UserSchema);

// Validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: passwordComplexity().required(),
    })
    return schema.validate(obj)
}

// Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required()
    });
    return schema.validate(obj)
}
module.exports = { User, validateRegisterUser, validateLoginUser }