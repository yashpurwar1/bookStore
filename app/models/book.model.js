/**
 * @module:         models
 * @file:           book.model.js
 * @description:    book.model is for book schema and operations on database
 * @author:         Yash
 */
 const mongoose = require('mongoose')
 const bookSchema = mongoose.Schema({
   addedBy: {
     type: String,
   },
   title: {
     type: String
   },
   description: {
     type: String,
     required: true,
     minlength: 2
   },
   price: {
    type: String,
    required: true
   },
   author: {
       type: String,
       required: true
   }
 },
 {
     timestamps: true
 });
 
 const Books = mongoose.model('Books', bookSchema);
 class BookModel {
   //Creates a book for the user by the given data
   createBook = (book) => {
     return new Promise((resolve, reject) =>{
       const bookInfo = new Books({
         addedBy: book.addedBy,
         title: book.title,
         description: book.description,
         price: book.price,
         author: book.author
       });
       //Saves the data in the database
       bookInfo.save()
            .then((data) =>{
                resolve(data)
            })
            .catch(() => {
                reject()
            })
        })
    }

    getBooks = () => {
        return new Promise((resolve, reject) =>{
          //Finds all the books in the database
          Books.find({})
            .then((data) => {
              resolve(data)
            })
            .catch((error) => {
              reject(error)
            })
        })
    }

    getBookById = (bookId) => {
      return new Promise((resolve, reject) =>{
        //Finds all the books in the database
        Books.findOne({_id: bookId})
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
  }

    updateBookById = async (book) => {
      const filter = {_id: book.bookId};
      const update = {title: book.title, description: book.description, price: book.price, author: book.author};
      try{
        // Updates the note for the given title or description in the database
        return await Books.findOneAndUpdate(filter, update, {new: true})
      }
      catch(error){
        return error;
      }
    }

    deleteBook = (id) => {
      return new Promise((resolve, reject) =>{
        //Finds all the books in the database
        Books.findOneAndDelete({ _id: id.id})
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    findBook = (id, callback)=>{
      Books.findOne({id: id}, (err, data)=>{
        return callback(null, data)
      })
    }
}
module.exports = new BookModel();