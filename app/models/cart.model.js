const mongoose = require('mongoose')
const userModel = require('../models/user.model')

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
                    data.save()
                    .then((data)=>{
                        console.log("empty")
                        return callback(null, data)
                    })
                    .catch((error)=>{
                        return callback(error, null)
                    })
                }
                else{
                    let updated = false;
                    const index = result.book.findIndex((item)=> item.bookId == userInfo.itemId);
                    console.log("index = ", index)
                        if(index >= 0){
                            updated = true;
                            const newBook= {
                                bookId: result.book[index].bookId,
                                qty: result.book[index].qty + userInfo.qty
                            }
                            console.log("Old Book", result.book[index])
                            console.log("newBook = ", newBook)
                            cart.updateOne({_id: result._id}, {$pull:{book: result.book[index]}},{new: true}, (err,res)=>{
                                console.log(err, res)
                            })
                            cart.updateOne({_id: result._id}, {$push:{book: newBook}},{new: true}, (err, res)=>{
                                if(err){
                                    return callback("Error in updating quantity", null)
                                }
                                else{
                                    return callback(null, "book updated")
                                }
                            })

                            //code for update "result.book[index].qty" 
                            
                            //console.log("element = ", qty)
                            // cart.findByIdAndUpdate(result._id, {$inc:{book: newBook}},{new: true}, (err, res)=>{
                            //     if(err){
                            //         return callback("Error in updating quantity", null)
                            //     }
                            //     else{
                            //         console.log(res)
                            //         return callback(null, "Quantity updated")
                            //     }
                            // })
                        }
                    if(updated == false){
                        const newBook= {
                            bookId: userInfo.itemId,
                            qty: userInfo.qty
                        }
                        console.log(result)
                        cart.findByIdAndUpdate(result._id, {$push:{book: newBook}},{new: true}, (err, res)=>{
                            if(err){
                                console.log(err)
                                return callback("Error in adding book", null)
                            }
                            else{
                                return callback(null, "book Pushed")
                            }
                        })
                    }
                    
                } 
            }
        })
        
    }
}
module.exports = new cartModel();