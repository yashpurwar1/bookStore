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
}
module.exports = new userModel();