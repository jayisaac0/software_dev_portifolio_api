const Joi = require('@hapi/joi');
const connection = require('mysql');

const validateprojectCategories = (projectcategories) => {
    const schema = Joi.object().keys({
        project_category_title: Joi.string().min(3).required(),
        project_category_description: Joi.string().min(3).required()
    });
    return schema.validate(projectcategories);
}

exports.validate = validateprojectCategories;