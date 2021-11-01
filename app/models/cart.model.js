const mongoose = require('mongoose')
const userModel = require('../models/user.model')

const cartSchema = mongoose.Schema({
    userId :{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
    },
    book:{
        bookId :{
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
        },
        qty:{
            type: Number
        }
    }
},
{
    timestamps: true
})

const cart = mongoose.model('cart', cartSchema);

class cartModel{
    addToCart = (userInfo, callback) => {
        const data = new cart({
            userId: userInfo.userId,
            book: {
                bookId: userInfo.itemId,
                qty: userInfo.qty
            }
        })
        data.save()
        .then((data)=>{
            return callback(null, data)
        })
        .catch((error)=>{
            return callback(error, null)
        })
    }
}
module.exports = new cartModel();