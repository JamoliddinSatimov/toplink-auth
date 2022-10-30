const { Router } = require("express")
const forgotPassword = require("../controllers/forgot.password")
const usersController = require("../controllers/users.controller")
const verifyUpdateToken = require("../middlewares/update-password-midleware")
const verifyNodemailerCode = require("../middlewares/verify-nodemailer")

const loginRouter = Router()

loginRouter
    .post("/login", usersController.LOGIN)
    .post('/forgotpage', forgotPassword.POSTEMAIL)
    .post('/verifycode', verifyNodemailerCode, forgotPassword.POSTVERIFYCODE)
    .put('/password', verifyUpdateToken , forgotPassword.UPDATEPASSWORD)

module.exports = loginRouter    