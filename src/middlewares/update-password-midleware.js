const { verify } = require("jsonwebtoken")
const CustomErrorHandler = require("../errors/customErrorHandler")

const verifyUpdateToken = (req, _, next) => {
    
    const {tokenforupdate} = req.headers

    if (!tokenforupdate) {
        return next(new CustomErrorHandler("tokenForUpdate not given", 400))
    }

    verify(tokenforupdate, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomErrorHandler(err.message, 400))
        }

        req.update_id = decoded.id

        next()
    })
}

module.exports = verifyUpdateToken