/**
* @module:         routes
* @file:           user.routes.js
* @description:    API routes
* @author:         Yash
*/

const helper = require('../utilities/helper')
const controller = require('../controller/user.controller')
const bookController = require('../controller/book.controller')
module.exports=(app) =>{
    //Api route for user
    app.post('/user/registration', helper.setRole('user'), controller.register);
    app.post('/admin/registration',helper.setRole('admin'), controller.register);
    app.post('/login', controller.login);
    app.post('/forgotPassword', controller.forgotPassword);
    app.put('/resetPassword', helper.verifyToken ,controller.resetPassword);
    app.put('/addToCart/:id', helper.verifyToken, controller.addToCart)

    app.post('/createBook', helper.verifyTokenAndRole, bookController.createBook)
    app.get('/getBooks', helper.verifyToken, bookController.getBooks)
    app.get('/getBookById/:bookId', helper.verifyToken, bookController.getBookById)
    app.put('/updateBook/:id', helper.verifyTokenAndRole, bookController.updateBookById)
    app.delete('/deleteBook/:id', helper.verifyTokenAndRole, bookController.deleteBook)
}