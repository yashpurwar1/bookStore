/**
 * @module:         config
 * @file:           database.config.js
 * @description:    Database connectivity
 * @author:         Yash
 */

 const mongoose = require('mongoose');
 require("dotenv").config();
 // Database connection
 class DBconnection{
     connection = () => {
     mongoose.connect(process.env.URL, {
         useNewUrlParser: true
      }).then(() => {
          console.log("Successfully connected to the database");    
      }).catch(err => {
          console.log('Could not connect to the database. Exiting now...', err);
          process.exit();
      });
     }
 }
 
 module.exports = new DBconnection();
 