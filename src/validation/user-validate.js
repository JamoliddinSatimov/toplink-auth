const Joi = require("joi")

const usersPostValidation = Joi.object().keys({
    fullname: Joi.string().required().max(64),
    phone: Joi.string().required().max(32),
    email: Joi.string().email().required().max(64),
    password: Joi.string().min(6).required().max(255),
    username: Joi.string().required().max(64)
})

const loginValidation = Joi.object().keys({
    email: Joi.string().email().required().max(64),
    password: Joi.string().min(6).required().max(255),
})

const accessCodeValidate = Joi.object().keys({
    access_code: Joi.string().required().length(6)
})

const updatePasswordValidator = Joi.object().keys({
    password: Joi.string().required().min(6),
    confirmpass: Joi.string().required().min(6)
})

module.exports = { usersPostValidation, loginValidation, accessCodeValidate, updatePasswordValidator }