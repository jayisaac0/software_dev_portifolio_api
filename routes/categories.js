const {validate} = require('../models/category');
const mysql = require('mysql');
const express = require('express');
require('dotenv').config();
const router = express.Router();

const connection = mysql.createConnection({host : process.env.DATABASE_HOST, user : process.env.DATABASE_USER, password : process.env.DATABASE_PASSWORD, database : process.env.DATABASE_NAME});
connection.connect((error) => {
    if (error) throw error;
    console.log('CONNECTED');
});

router.get('/', async(request, response) => {
    await connection.query(`SELECT * FROM categories`, (error, results, fields) => {
        response.send(results);
    });
});

router.post('/', async(request, response) => {
    const {error} = validate(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    let category_title = request.body.category_title;
    let category_description = request.body.category_description;
    
    await connection.query(`INSERT INTO categories (category_title, category_description) VALUES('${category_title}', '${category_description}')`, (error, results, field) => {
        response.send({error : error, data : results, message : 'Records saved'})
    });
});

router.put('/:id', async(request, response) => {
    const {error} = validate(request.body);
    if (error) return response.status(404).send(error.details[0].message);
    let category_title = request.body.category_title;
    let category_description = request.body.category_description;

    await connection.query(`UPDATE categories SET category_title='${category_title}', category_description=${category_description}  WHERE users_id = '${request.params.id}'`, (error, results, field) => {
        response.send({error : error, data : results, message : 'Records edited'})
    });
});

module.exports = router;