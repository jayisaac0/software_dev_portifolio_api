const Joi = require('@hapi/joi');
const connection = require('mysql');

const validatesubCategories = (subcategories) => {
    const schema = Joi.object().keys({
        category_id: Joi.number().required(),
        sub_category_title: Joi.string().min(3).required(),
        sub_category_description: Joi.string().min(3).required(),
        image_url: Joi.string().min(3).required()
    });
    return schema.validate(subcategories);
}

exports.validate = validatesubCategories;