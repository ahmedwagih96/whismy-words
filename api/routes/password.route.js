const router = require("express").Router()
const { sendResetPasswordLink, getResetPasswordLink, resetPassword } = require("../controllers/password.controller.js")


router.route('/send-reset-password-link').post(sendResetPasswordLink)
router.route('/reset-password-link/:userId/:token')
    .get(getResetPasswordLink)
    .post(resetPassword)

module.exports = router