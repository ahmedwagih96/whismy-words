const nodemailer = require('nodemailer')

const sendEmail = async (userEmail, subject, htmlTemplate) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP__EMAIL_ADDRESS,
                pass: process.env.APP_EMAIL_PASSWORD
            },
        });
        const mailOptions = {
            fom: process.env.APP__EMAIL_ADDRESS,
            to: userEmail,
            subject: subject,
            html: htmlTemplate
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw new Error('Internal Server Error (nodemailer)')
    }
}

const sendVerifyEmail = async (id, token, email) => {
    // Making the Link 
    const link = `${process.env.CLIENT_DOMAIN}/auth/verify-user/${id}/${token}`

    // Putting the link into an html template
    const htmlTemplate = `
         <div>
             <p> Click on the link to verify your email </p>
             <a href="${link}">Verify</a>
         </div>
     `

    // Send the verification email
    await sendEmail(email, "Verify Your Email", htmlTemplate)
}

const sendResetPasswordEmail = async (id, token, email) => {
    // Making the Link 
    const link = `${process.env.CLIENT_DOMAIN}/auth/reset-password/${id}/${token}`
    // Putting the link into an html template
    const htmlTemplate = `
    <div>
        <p> Click on the link to reset your password </p>
        <a href="${link}">Reset Password</a>
    </div>
`
    // Send the verification email
    await sendEmail(email, "Reset Your Password", htmlTemplate)
}

module.exports = { sendVerifyEmail, sendResetPasswordEmail }