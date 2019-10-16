const {validate} = require('../models/subcategory');
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
    await connection.query(`SELECT * FROM subcategories`, (error, results, fields) => {
        response.send(results);
    });
});

router.post('/', async(request, response) => {
    const {error} = validate(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    let category_id = request.body.category_id
    let sub_category_title = request.body.sub_category_title;
    let sub_category_description = request.body.sub_category_description;
    let image_url = request.body.image_url;
    
    await connection.query(`INSERT INTO subcategories (category_id, sub_category_title, sub_category_description, image_url) VALUES('${category_id}', '${sub_category_title}', '${sub_category_description}', '${image_url}')`, (error, results, field) => {
        response.send({error : error, data : results, message : 'Records saved'})
    });
});

router.put('/:id', async(request, response) => {
    const {error} = validate(request.body);
    if (error) return response.status(404).send(error.details[0].message);
    let category_id = request.body.category_id
    let sub_category_title = request.body.sub_category_title;
    let sub_category_description = request.body.sub_category_description;
    let image_url = request.body.image_url;

    await connection.query(`UPDATE subcategories SET category_id='${category_id}', sub_category_title='${sub_category_title}', sub_category_description='${sub_category_description}', image_url='${image_url}'  WHERE users_id = '${request.params.id}'`, (error, results, field) => {
        response.send({error : error, data : results, message : 'Records edited'})
    });
});

module.exports = router;