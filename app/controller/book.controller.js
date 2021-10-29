/**
 * @module:         controllers
 * @file:           note.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Yash
*/

const bookService = require('../service/book.service');
const validation = require('../utilities/validation');

class BookController{
    /**
     * @description:    Create and save book and sending response to service
     * @method:         creates the book for the user
     * @param:          req,res for service
     */
    createBook = (req, res) => {
        try{
            const book = {
                addedBy: req.user.email,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                author: req.body.author
            }
            // To validate the data entered by user
            const validate = validation.createValidate.validate(book);
            if (validate.error){
                return res.status(422).json({
                    success: false,
                    message: "validation failed", 
                })
            }
            bookService.createBook(book)
                .then((data) => {
                return res.status(201).json({
                    message: "Book created successfully",
                    data: data,
                    success: true
                })
                })
                .catch(()=>{
                return res.status(400).json({
                    message: "Book not saved in database",
                    success: false
                })
                })
        }
        catch(error){
            return res.status(500).json({
                message: "Internal server error",
                success: false
            })
        }
    }

    /**
     * @description:    Fetches all the books
     * @method:         getBooks
     * @param:          req,res for service
     */
    getBooks = (req, res) => {
        try {
            bookService.getBooks()
            .then((data) => {
                return res.status(200).json({
                message: 'Fetched successfully',
                success: true,
                data: data
                });
            })
            .catch((error) => {
                return res.status(400).json({
                message: "Not able to fetch",
                success: false
                });
            })
        } 
        catch {
            return res.status(500).json({
                message: 'Internal server Error'
            });
        }
    }

    /**
     * @description:    Deletes book by id
     * @method:         deleteBook
     * @param:          req,res for service
     */
     deleteBook = (req, res) => {
        try {
            const id = {
                id: req.params.id
            } 
            bookService.deleteBook(id)
            .then((data) => {
                if(data==null){
                    return res.status(401).json({
                        message: 'Invalid bookId',
                        success: false
                        });
                }else{
                    return res.status(200).json({
                        message: 'Deleted successfully',
                        success: true,
                        data: data
                    });
                }
            })
            .catch((error) => {
                return res.status(400).json({
                message: "Not able to fetch",
                success: false
                });
            })
        } 
        catch {
            return res.status(500).json({
                message: 'Internal server Error'
            });
        }
    }
}
module.exports = new BookController();