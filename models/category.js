const Joi = require('@hapi/joi');
const connection = require('mysql');

const validateCategories = (categories) => {
    const schema = Joi.object().keys({
        category_title: Joi.string().min(3).required(),
        category_description: Joi.string().min(3).required()
    });
    return schema.validate(categories);
}

exports.validate = validateCategories;