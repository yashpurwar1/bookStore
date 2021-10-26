/**
* @module:         routes
* @file:           user.routes.js
* @description:    API routes
* @author:         Yash
*/

const controller = require('../controller/user.controller')
module.exports=(app) =>{  
    //Api route for user
    app.post('/register',controller.register);
}