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
    email: data.email,
    role: data.role,
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

    /**
   * @description:    Verifies token and returns data
   * @method:         verifyToken for entered token and pass it to next
   * @param:          req, res, next
   */
  verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    const bearerToken = header.split(' ');
    const token = bearerToken[1];
    try {
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
          if (error) {
            return res.status(401).send({ 
              success: false, 
              message: 'Unauthorized Token or token expired'
            })
          } else {
            req.user = data;
            next();
          }
        });
      } else {
        return res.status(401).send({
            success: false,
            message: 'Invalid Token' 
          });
        }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Something went wrong!' 
      });
    }
  }

    /**
   * @description:    Verifies token and returns data
   * @method:         verifyToken for entered token and pass it to next
   * @param:          req, res, next
   */
     verifyTokenAndRole = (req, res, next) => {
      const header = req.headers.authorization;
      const bearerToken = header.split(' ');
      const token = bearerToken[1];
      try {
        if (token) {
          jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
            console.log((data))
            if (error) {
              return res.status(401).send({ 
                success: false, 
                message: 'Unauthorized Token or token expired'
              })
            } 
            else if(data.role != "admin"){
              console.log("elseIf", req.user.role)
              return res.status(401).send({ 
                success: false, 
                message: 'Unauthentic user'
              })
            }else {
              req.user = data;
              console.log(data)
              next();
            }
          });
        } else {
          return res.status(401).send({
              success: false,
              message: 'Invalid Token' 
            });
          }
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: 'Something went wrong!' 
        });
      }
    }
}
module.exports = new helper();