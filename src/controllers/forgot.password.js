const bcrypt = require("bcrypt")
const CustomErrorHandler = require("../errors/customErrorHandler")
const sendEmail = require("../utils/nodemailer")
const { usersModel } = require("../model")
const verifyEmail = require("../model/verifyEmail")
const { sign } = require("../utils/jwt")
const { updatePasswordValidator } = require("../validation/user-validate")

module.exports = {
    POSTEMAIL: async(req, res, next) => {
        const { email } = req.body

        if (!email) {
            return next(new CustomErrorHandler("email not given", 400))
        }

        const foundUser = await usersModel.findOne({
            where: {
                email
            }
        })

        if (!foundUser) {
            return next(new CustomErrorHandler("email did not exists", 400))
        }

        let verifyCode = ''

        for (let i = 0; i < 6; i++) {
            verifyCode += String(Math.trunc((Math.random()*10)))
        }

        sendEmail(email, verifyCode, next)

        const newVerify = await verifyEmail.create({email, verifycode: verifyCode }).catch(err => next(new CustomErrorHandler(err.message, 503)))

        if (!newVerify) {
            return next(new CustomErrorHandler('qaytadan urinib koring!', 400))
        }

        res.json({
            success: true,
            message: "email pochtangizga tasdiqlash kodini yubordik!"
        })
    },

    POSTVERIFYCODE: async(req, res, next) => {
        const code = req?.access_code

        const foundEmail = await verifyEmail.findOne({
            where: {
                verifycode: code
            }
        })

        if (!foundEmail) {
            return next(new CustomErrorHandler('verify code invalid', 400))
        }

        const foundUser = await usersModel.findOne({
            where: {
                email: foundEmail?.email
            }
        })

        const tokenForUpdate = sign({id: foundUser.id})


        res.json({
            success: true,
            message: "code has been verified successfully",
            tokenForUpdate
        })
        
    },
    UPDATEPASSWORD: async(req, res, next) => {

        const {error, value} = updatePasswordValidator.validate(req.body)

        if (error) {
            return next(new CustomErrorHandler(error.message, 400))
        }

        const {password, confirmpass} = value

        if (password !== confirmpass) {
            return next(new CustomErrorHandler('check your password', 400))
        }

        const id = req?.update_id

        
        const updatedUser = await usersModel.update({ password: bcrypt.hashSync(password, 10) }, { where: { id } })
        .catch(err => next(new CustomErrorHandler(err.message, 503)))

        if (updatedUser<1) {
            return next(new CustomErrorHandler("qaytadan urinib koring!", 400))
        }

        res.json({
            success: true,
            message: "user updated successfully"
        })
    }
}