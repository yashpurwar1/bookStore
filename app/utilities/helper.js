/** @module:         utilities
*  @file:           helper.js
* @description:    
* @author:         Yash
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class helper{
 /**
  * @description:    Creates hash of password entered by user
  * @method:         passwordHash for creating hash
  * @param:          password for creating hash, callback
  */
    passwordHash = (password, callback) => {
        bcrypt.hash(password, 10, (err, hash) =>{
            if(err){
                throw err
            }else{
                return callback(null,hash)
            }
        })
    }

    setRole = (role) => {
        return (req, res, next) => {
            req.role = role;
            next();
            console.log(req.role)
        }
    }

    /**
   * @description:    Creates token for recieved data
   * @method:         token for generating token
   * @param:          data for generating token, callback
   */

  token = (data, callback) => {
    const key = jwt.sign({
    firstName: data.firstName,
    lastName: data.lastName,
    id: data._id
    }, process.env.SECRET_KEY);
    if (key){
        return callback(null, key);    
    }else{
        return callback(err, null);
    }
  }
  /**
   * @description:    Creates token for forgot password data
   * @method:         tokenForgotPassword for token
   * @param:          data for generating token, callback
   */
   tokenForgotPassword = (data, callback) => {
    const key = jwt.sign({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
    }, process.env.SECRET_KEY);
    if (key){
        return callback(null, key);    
    }else{
        return callback(err, null);
    }
  }
}
module.exports = new helper();