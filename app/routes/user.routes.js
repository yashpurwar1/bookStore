/**
* @module:         routes
* @file:           user.routes.js
* @description:    API routes
* @author:         Yash
*/

const helper = require('../utilities/helper')
const controller = require('../controller/user.controller')
const bookController = require('../controller/book.controller')
const cartController = require('../controller/cart.controller')
const redis = require('../utilities/redis')
module.exports=(app) =>{
    //Api route for user
    app.post('/user/registration', helper.setRole('user'), controller.register);
    app.post('/admin/registration',helper.setRole('admin'), controller.register);
    app.post('/login', controller.login);
    app.post('/forgotPassword', controller.forgotPassword);
    app.put('/resetPassword', helper.verifyToken ,controller.resetPassword);

    app.post('/createBook', helper.verifyTokenAndRole, bookController.createBook)
    app.get('/getBooks', helper.verifyToken, bookController.getBooks)
    app.get('/getBookById/:bookId', helper.verifyToken, redis.getBookById, bookController.getBookById)
    app.put('/updateBook/:id', helper.verifyTokenAndRole, bookController.updateBookById)
    app.delete('/deleteBook/:id', helper.verifyTokenAndRole, bookController.deleteBook)

    app.put('/addToCart/:id', helper.verifyToken, cartController.addToCart)
    app.get('/cartValue', helper.verifyToken, cartController.cartValue)
}