const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if(err) {
    return console.log("Error connecting to MySQL", err)
  }
    console.log("MySQL connection successful")
})

// question 1: retrieve patients
app.get('/get-patients', (req, res) => {
  const getPatients = "SELECT * FROM patients"
  db.query(getPatients, (err, results) =>{
    if(err){
      return res.status(500).send("failed to retrieve patients")
    }
    res.status(200).send(results)
  });
});

// question 2: Retrieve all providers
app.get('/get-providers', (req,res) => {
  const getproviders = "SELECT * FROM providers"
  db.query(getproviders, (err,results) =>{
  if(err){
          return res.status(500).send('error retrieving data')
      }
        res.status(200).send(results);
    });
  });

  // question 3 :Filter patients by first_name
  app.get('/filter-patients', (req, res) => {
        const getpatients= "SELECT * FROM patients ORDER BY first_name"
    db.query(getpatients, (err, results) => {
          if (err) {
            return res.status(500).send('Error filtering data');
          } 
            res.status(200).send(results);
         
        });
      });

      // Question 4: Retrieve all providers by their specialty
      app.get('/provider-specialty', (req, res) => {
          const getproviders = "SELECT * FROM providers ORDER BY provider_specialty" 
        db.query(getproviders, (err, results) => {
              if (err) {
                return res.status(500).send('Error retrieving data');
              } else {
                res.status(200).send(results);
              }
            });
          });


      




const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})