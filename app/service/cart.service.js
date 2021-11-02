const cartModel = require('../models/cart.model')

class cartService{
    addToCart = (userInfo, callback) =>{
        cartModel.addToCart(userInfo, (err, data)=>{
            if(err){
                return callback(err, null)
            }
            else{
                return callback(null, data)
            }
        })
    }
    cartValue = (userId, callback)=>{
        cartModel.cartValue(userId, (err, data)=>{
            if(err){
                return callback(err, null)
            }
            else{
                return callback(null, data)
            }
        })
    }
}
module.exports = new cartService()