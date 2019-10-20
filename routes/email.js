const { validate } = require("../models/email");
const mysql = require("mysql");
const express = require("express");
require("dotenv").config();
const router = express.Router();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});
connection.connect(error => {
  if (error) throw error;
  console.log("CONNECTED");
});

router.get("/", async (request, response) => {
  await connection.query(
    `SELECT * FROM my_emails`,
    (error, results, fields) => {
      response.send(results);
    }
  );
});

router.post("/", async (request, response) => {
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  let name = request.body.name;
  let email = request.body.email;
  let subject = request.body.subject;
  let message = request.body.message;

  await connection.query(
    `INSERT INTO my_emails (name, email, subject, message) VALUES('${name}', '${email}', '${subject}', '${message}')`,
    (error, results, field) => {
      response.send({ error: error, data: results, message: "Email sent" });
    }
  );
});

module.exports = router;
