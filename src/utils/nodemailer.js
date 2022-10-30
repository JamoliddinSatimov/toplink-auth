const nodemailer = require('nodemailer')
const CustomErrorHandler = require('../errors/customErrorHandler')

const sendEmail = async(email, content, next) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILADDRESS,
            pass: process.env.PASSWORD
        }
    })

    const info = {
        from: 'satimovjamoliddin2000@gmail.com',
        to: email,
        subject: 'Toplink Web Site',
        text: `Toplink uchun tasdiqlash kodi: ${content} `
    }

    transporter.sendMail(info, (err) => {
        if (err) {
            return next(new CustomErrorHandler(err.message, 400))
        }
    })

    
}

module.exports = sendEmail