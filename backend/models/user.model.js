const mongoose = require("mongoose");
const { UserSchema } = require("../schemas/user.schema.js");
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
// Generate Auth Token
UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET)
}

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

// Validate New Password
function validateNewPassword(obj) {
    const schema = Joi.object({
        password: passwordComplexity().required()
    });
    return schema.validate(obj)
}


// Validate Email
function validateEmail(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj)
}

// Validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        password: passwordComplexity(),
        bio: Joi.string()
    });
    return schema.validate(obj)
}

module.exports = { User, validateRegisterUser, validateLoginUser, validateNewPassword, validateEmail, validateUpdateUser }