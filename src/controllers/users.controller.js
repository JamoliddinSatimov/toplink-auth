const bcrypt = require("bcrypt")
const CustomErrorHandler = require("../errors/customErrorHandler")
const {usersModel} = require("../model")
const { usersPostValidation, loginValidation } = require("../validation/user-validate")
const { sign } = require("../utils/jwt")

module.exports = {
    GET: async(req, res, next) => {

        const allUsers = await usersModel.findAll()
        .catch(err => next(new CustomErrorHandler(err.message, 503)))

        console.log(req.cookies)
        

        return res.json({
            success: true,
            users: allUsers
        })

    },
    POST: async(req, res, next) => {

        const {error, value} = usersPostValidation.validate(req.body)

        if (error) {
            return next(new CustomErrorHandler(error.message, 400))
        }

        const { fullname, phone, email, password, username } = value

        const newUser = await usersModel.create({
            fullname,
            phone,
            email,
            password: bcrypt.hashSync(password, 10),
            username
        }).catch(err => next(new CustomErrorHandler(err.message, 503)))

        return res.status(201).json({
            success: true,
            status: "user has been created successfully",
            newUser
        })

    },

    LOGIN: async(req, res, next) => {

        const {error, value} = loginValidation.validate(req.body)

        if (error) {
            return next(new CustomErrorHandler(error.message, 400))
        }

        const { email, password } = value

        const allUsers = await usersModel.findAll()
        .catch(err => next(new CustomErrorHandler(err.message, 503)))

        const foundUser = allUsers.find(user => (email == user.email && bcrypt.compareSync(password, user.password)))

        if (!foundUser) {
            return next(new CustomErrorHandler("user did not exists", 400))
        }

        const token = sign({id: foundUser.id})

        return res.json({
            success: true,
            access_token: token
        })

    },
}