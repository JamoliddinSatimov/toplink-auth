const CustomErrorHandler = require("../errors/customErrorHandler")
const { accessCodeValidate } = require("../validation/user-validate")

const verifyNodemailerCode = (req, res, next) => {

    const {error, value} = accessCodeValidate.validate(req.body)

    if (error) {
        return next(new CustomErrorHandler(error.message, 400))
    }

    const { access_code } = value

    req.access_code = access_code

    next()
}

module.exports = verifyNodemailerCode