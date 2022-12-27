require('dotenv').config()
const nodemailer = require('nodemailer')

const sendEmail = async (email, code) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    })

    let mailOption = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: 'Forget Password Verification Code',
      text: code,
    }

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Email sent: ${info.response}`)
      }
    })
  } catch (error) {
    console.error('send-mail-error', error)
    return res.redirect('forget_password')
  }
}

module.exports = sendEmail
