const {validate} = require('../models/projectsubcategory');
const mysql = require('mysql');
const express = require('express');
require('dotenv').config();
const router = express.Router();

const connection = mysql.createConnection({host : process.env.DATABASE_HOST, user : process.env.DATABASE_USER, password : process.env.DATABASE_PASSWORD, database : process.env.DATABASE_NAME});
connection.connect((error) => {
    if (error) throw error
    console.log('CONNECTED');
});

router.get('/', async(request, response) => {
    await connection.query(`SELECT * FROM project_subcategories`, (error, results, fields) => {
        response.send(results);
    });
});

router.post('/', async(request, response) => {
    const {error} = validate(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    let project_categories_id = request.body.project_categories_id
    let project_sub_category_title = request.body.project_sub_category_title;
    let project_sub_category_description = request.body.project_sub_category_description;
    let project_image_url = request.body.project_image_url;
    let project_status = request.body.project_status;
    let project_live_url = request.body.project_live_url;
    let project_repository = request.body.project_repository;

    await connection.query(`INSERT INTO project_subcategories (project_categories_id, project_sub_category_title, project_sub_category_description, project_image_url, project_status, project_live_url, project_repository) VALUES('${project_categories_id}', '${project_sub_category_title}', '${project_sub_category_description}', '${project_image_url}', '${project_status}', '${project_live_url}', '${project_repository}')`, (error, results, field) => {
        response.send({error : error, data : results, message : 'Records saved'})
    });
});

router.put('/:id', async(request, response) => {
    const {error} = validate(request.body);
    if (error) return response.status(404).send(error.details[0].message);
    let project_categories_id = request.body.project_categories_id
    let project_sub_category_title = request.body.project_sub_category_title;
    let project_sub_category_description = request.body.project_sub_category_description;
    let project_image_url = request.body.project_image_url;
    let project_status = request.body.project_status;
    let project_live_url = request.body.project_live_url;
    let project_repository = request.body.project_repository;

    await connection.query(`UPDATE project_subcategories SET project_categories_id='${project_categories_id}', project_sub_category_title='${project_sub_category_title}', project_sub_category_description='${project_sub_category_description}', project_image_url='${project_image_url}', project_status='${project_status}', project_live_url='${project_live_url}', project_repository='${project_repository}'  WHERE project_subcategories_id = '${request.params.id}'`, (error, results, field) => {
        response.send({error : error, data : results, message : 'Records edited'})
    });
});

module.exports = router;