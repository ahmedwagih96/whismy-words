const mongoose = require("mongoose");
const { VerificationTokenSchema } = require("../schemas/verificationToken.schema.js");

const VerificationToken = mongoose.model("VerificationToken", VerificationTokenSchema);



module.exports = { VerificationToken }