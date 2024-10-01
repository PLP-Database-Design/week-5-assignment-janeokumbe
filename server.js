const express = require('express')
const app = express();

const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

db.connect((err) => {
    if(err) return console.log("Error connecting to MySQL");
    console.log("connected to Mysql as id.", db.threadId);
});

app.set('view engine', "ejs")
app.set('views', __dirname + "/views");

app.get('/data', (req,res) =>{
    // question 1: Retrieve all patients
    db.query('SELECT * FROM patients', (err,results) =>{
        if(err){
            console.error(err);
            res.status(500).send('error retrieving data')
        }else {
            res.render('data',{results: results});
        }
    });
});

app.get('/data', (req,res) =>{
// question 2: Retrieve all providers
db.query('SELECT * FROM providers', (err,results) =>{
    if(err){
        console.error(err);
        res.status(500).send('error retrieving data')
    }else {
        res.render('data',{results: results});
    }
  });
});

app.get('/data', (req, res) => {
      
    // Question 3: filter patients by first name
    db.query('SELECT * FROM patients ORDER BY first_name', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error filtering data');
      } else {
        res.render('data', { results: results });
      }
    });
  });

  app.get('/data', (req, res) => {
      
    // Question 4: Retrieve all providers by their specialty
    db.query('SELECT * FROM providers ORDER BY provider_specialty', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
      } else {
        res.render('data', { results: results });
      }
    });
  });
  

const PORT = 3300
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);

  console.log('sending message to browser')
  app.get('/',(req,res) => {
    res.send('server started successfully');
  });
});