/**
 * @module:         service
 * @file:           book.service.js
 * @description:    callbacks from the model and takes input from controller
 * @author:         Yash
 */

 const bookModel = require('../models/book.model');
 class BookService {
   /**
       * @description:    Send response to the controller
       * @method:         createBook
       * @param:          book
       */
   createBook = (book) => {
     return new Promise((resolve, reject) => {
       bookModel.createBook(book)
         .then((data) => {
           resolve(data)
         })
         .catch(() => {
           reject()
         })
     })
    }

    /**
      * @description:    Send response to the controller
      * @method:         getBook
      */
  getBooks = () => {
    return new Promise((resolve, reject) => {
      bookModel.getBooks()
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
module.exports = new BookService()