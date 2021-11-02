const mongoose = require('mongoose')
const bookModel = require('../models/book.model')
const cartSchema = mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId, ref: 'user' 
    },
    book:[{
        bookId :{
            type: mongoose.Schema.Types.ObjectId, ref: 'book' 
        },
        qty:{
            type: Number
        }
    }]
},
{
    timestamps: true
})

const cart = mongoose.model('cart', cartSchema);

class cartModel{
    addToCart = (userInfo, callback) => {
        const data = new cart({
            userId: userInfo.userId,
            book: [{
                bookId: userInfo.itemId,
                qty: userInfo.qty
            }]
        })
        cart.findOne({userId: userInfo.userId}, (err, result)=>{
            if(err){
                return callback(err, null)
            }
            else{
                if(result == null){
                    if(data.qty <= 0){
                        return callback("Qty can not be less than 1", null)
                    }
                    data.save()
                    .then((res)=>{
                        this.cartValue(userInfo.userId, (err, total)=>{
                            let response = {
                                data: res,
                                msg: "Added to cart",
                                totalValue: total
                            }
                            return callback(null, response)
                        })
                        
                    })
                    .catch((error)=>{
                        return callback(error, null)
                    })
                }
                else{
                    let updated = false;
                    const index = result.book.findIndex((item)=> item.bookId == userInfo.itemId);
                    //console.log("index = ", index)
                        if(index >= 0){
                            updated = true;
                            const newBook= {
                                bookId: result.book[index].bookId,
                                qty: result.book[index].qty + userInfo.qty
                            }
                            if(newBook.qty <= 0 ){
                                cart.findOneAndUpdate({_id: result._id}, {$pull:{book: result.book[index]}},{new: true}, (err,res)=>{
                                    if(err){
                                        return callback("Error in pulling book", null)
                                    }else{
                                        this.cartValue(userInfo.userId, (err, total)=>{
                                        let response = {
                                            data: res,
                                            msg: "Book removed from cart",
                                            totalValue: total
                                        }
                                        return callback(null, response)
                                    })
                                    }
                                })
                            }else{
                                cart.updateOne({_id: result._id}, {$pull:{book: result.book[index]}},{new: true}, (err,res)=>{                                })
                                cart.findOneAndUpdate({_id: result._id}, {$push:{book: newBook}},{new: true}, (err, res)=>{
                                    if(err){
                                        return callback("Error in updating quantity", null)
                                    }
                                    else{
                                        this.cartValue(userInfo.userId, (err, total)=>{
                                        let response = {
                                            data: res,
                                            msg: "Quantity updated",
                                            totalValue:total
                                        }
                                        return callback(null, response)
                                    })
                                    }
                                })
                            }
                            // console.log("Old Book", result.book[index])
                            // console.log("newBook = ", newBook)
                            
                        }
                    if(updated == false){
                        const newBook= {
                            bookId: userInfo.itemId,
                            qty: userInfo.qty
                        }
                        if(newBook.qty <= 0 ){
                            return callback("Quantity can not be negative or zero", null)
                        }
                        cart.findByIdAndUpdate(result._id, {$push:{book: newBook}},{new: true}, (err, res)=>{
                            if(err){
                                console.log(err)
                                return callback("Error in adding book", null)
                            }
                            else{
                                this.cartValue(userInfo.userId, (err, total)=>{
                                let response = {
                                    data: res,
                                    msg: "Book Pushed",
                                    totalValue: total
                                }
                                return callback(null, response)
                            })
                            }
                        })
                    }
                    
                } 
            }
        })
        
    }

    cartValue = (userId, callback) => {
        cart.findOne({userId: userId}, (err, result)=>{
            if(err){
                return callback(err, null)
            }
            else{
                let total = 0;
                let i = 0
                if(result.book.length == 0){
                    return callback(null, 0)
                }
                result.book.forEach(element => { 
                    console.log(element)                   
                    bookModel.findBook(element.id, (err, data)=>{
                        total = total + (data.price * element.qty)
                        console.log("test", total)
                        i++;
                        if(i == result.book.length){
                            return callback(null, total)
                        }
                    })
                });

            }
        })

    }
}
module.exports = new cartModel();