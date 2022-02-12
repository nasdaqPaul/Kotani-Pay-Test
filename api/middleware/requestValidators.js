const Joi = require('joi');
const loginSchema = Joi.object({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
})

const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        emailAddress: Joi.string().required().email(),
        password: Joi.string().required()
    })

module.exports.userValidator = async function (req, res, next) {
    try {
        await userSchema.validateAsync(req.body);
        next()
    }
    catch (e) {
        return res.status(400).json(e.details);
    }
}

module.exports.loginValidator = async function(req, res, next) {
    try {
        await loginSchema.validateAsync(req.body);
        next()
    }
    catch (e) {
        return res.status(400).json(e.details);
    }
}