const Joi = require('@hapi/joi');
const connection = require('mysql');

const validateprojectsubCategories = (projectsubcategories) => {
    const schema = Joi.object().keys({
        project_categories_id:  Joi.number().required(),
        project_sub_category_title:  Joi.string().min(3).required(),
        project_sub_category_description:  Joi.string().min(3).required(),
        project_image_url:  Joi.string().min(3).required(),
        project_status:  Joi.string().min(3).required(),
        project_live_url:  Joi.string().min(3).required(),
        project_repository:  Joi.string().min(3).required(),
    });
    return schema.validate(projectsubcategories);
}

exports.validate = validateprojectsubCategories;