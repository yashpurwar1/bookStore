/**
 * @module:         models
 * @file:           user.model.js
 * @description:    user.model is for user schema and for hash of the password
 * @author:         Yash
 */

const mongoose = require('mongoose');
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
        });

        newUser.save().then(
            ()=>{
                return callback(null, newUser);
            }).catch(
            () => {
                return callback("Email already registered", null)
            })
    }
}
module.exports = new userModel();