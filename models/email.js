const Joi = require('@hapi/joi');
const connection = require('mysql');

const validateEmail = (email) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        subject: Joi.string().min(3).required(),
        message: Joi.string().min(3).required()
    });
    return schema.validate(email);
}

exports.validate = validateEmail;