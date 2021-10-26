/** @module:         utilities
*  @file:           helper.js
* @description:    
* @author:         Yash
*/

const bcrypt = require('bcrypt');

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
}
module.exports = new helper();