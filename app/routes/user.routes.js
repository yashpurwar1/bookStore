/**
* @module:         routes
* @file:           user.routes.js
* @description:    API routes
* @author:         Yash
*/

const helper = require('../utilities/helper')
const controller = require('../controller/user.controller')
module.exports=(app) =>{
    //Api route for user
    app.post('/user/registration', helper.setRole('user'), controller.register);
    app.post('/admin/registration',helper.setRole('admin'), controller.register);
    app.post('/login', controller.login);
    app.post('/forgotPassword', controller.forgotPassword);
}