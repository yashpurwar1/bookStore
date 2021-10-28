/**
 * @module:         service
 * @file:           note.service.js
 * @description:    callbacks from the model and takes input from controller
 * @author:         Yash
 */

 const bookModel = require('../models/book.model');
 class BookService {
   /**
       * @description:    Send response to the controller
       * @method:         createNote
       * @param:          note
       */
   createBook = (book) => {
     return new Promise((resolve, reject) => {
         console.log("in service")
       bookModel.createBook(book)
         .then((data) => {
           resolve(data)
         })
         .catch(() => {
           reject()
         })
     })
   }
}
module.exports = new BookService()