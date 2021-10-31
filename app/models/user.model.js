/**
 * @module:         models
 * @file:           user.model.js
 * @description:    user.model is for user schema and for hash of the password
 * @author:         Yash
 */

const mongoose = require('mongoose');
const helper = require('../utilities/helper')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: String,
        minlength: 3
    },
    cart: {
        type: [{ type: String}]
    },
    },
    {
        timestamps: true
    })

const user = mongoose.model('user', userSchema);

class userModel {
    /**
     * @description:    Register user in the database
     * @param:          userDetails
     * @param:          callback 
     */
    registerUser = (userDetails, callback) => {

        const newUser = new user({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
            role:userDetails.role
        });
        // To create the hash of the password
        helper.passwordHash(newUser.password, (err, hash) => {
            if (hash) {
            newUser.password = hash;
            //To the the user in the database
            newUser.save().then(
                ()=>{
                    return callback(null, newUser);
                }).catch(
                () => {
                    return callback("Email already registered", null)
                })
            }else {
            return callback("Internal error", null)
            }
        });
    }

    findEmail = (loginData, callBack) => {
        //To find a user email in the database
        user.findOne({ email: loginData.email }, (error, data) => {
            if (data) {
                return callBack(null, data);           
            } else{
                return callBack("Invalid email", null);
            }
        });
    }

    /**
     * @description:    Reset the password of the user
     * @param:          resetPassword
     * @param:          user and callback for service
     */
     resetPassword = (newUser, callback) =>{
        //To find a user in the database by the user email
        user.findOne({email: newUser.email }, (error, data) =>{
            if(error){
                return callback("No user found with following email", null)
            }else{
                // To generate the hash of the password
                helper.passwordHash(newUser.newPassword, (err, hash) => {
                    if (hash) {
                        const updatedPassword = hash;
                        // To update the old password with the new one
                        user.updateOne({"_id": data._id}, {"password": updatedPassword}, (error, data) => {
                            if(data.acknowledged == true){
                                return callback (null, "Updated successfully")
                            }
                            else{
                                return callback ("Error in updating", null)
                            }
                        })
                    }
                    else{
                        return callback ("Error in hash on password", null)
                    }
                })
            }
        })
    }

    addToCart = (userInfo, callback) => {
        user.findOne({email: userInfo.email},(err, data)=>{
            if(err){
                return callback("Error in finding user", null)
            }
            else{
                const cart = data.cart
                if(cart != null){
                    for(let i=0; i<cart.length; i++){
                        let item = JSON.parse(cart[i])
                        if(item.itemId == userInfo.item.itemId){
                            return callback("Book already in the cart", null)
                        }
                    }
                }
                const book = JSON.stringify(userInfo.item)
                user.findOneAndUpdate({email: userInfo.email}, { $push: { cart: book } }, {new: true}, (err, data)=>{
                    if(err){
                        console.log(err)
                        return callback ("Error in adding to cart", null)
                    }
                    else{
                        return callback (null, data)
                    }
                })
            }
        })
        
    }
}
module.exports = new userModel();