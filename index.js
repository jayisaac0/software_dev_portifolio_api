const mysql = require('mysql');
const express = require('express');
const categories = require('./routes/categories');
const subcategories = require('./routes/subcategories');
const projectcategories = require('./routes/projectcategories');
const projectsubcategories = require('./routes/projectsubcategories');
require('dotenv').config();
const app = express();

const connection = mysql.createConnection({host : process.env.DATABASE_HOST, user : process.env.DATABASE_USER, password : process.env.DATABASE_PASSWORD, database : process.env.DATABASE_NAME});
connection. connect((error) => {
    if(error) throw error
    console.log('Connected');
});

app.use(express.json());
app.use('/api/categories', categories);
app.use('/api/subcategories', subcategories);
app.use('/api/projectcategories', projectcategories);
app.use('/api/projectsubcategories', projectsubcategories);

app.use(helmet());
app.use(compression());


const port = process.env.PORT || 2500;
app.listen(port, () => console.log(`Listening to port ${port}`));