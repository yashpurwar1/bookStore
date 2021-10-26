/**
 * @module:         controller
 * @file:           user.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Yash
*/

const userService = require('../service/user.service')
const validation = require('../utilities/validation')
const nodemailer = require('../utilities/nodemailer')

class Controller {

    /**
     * @description:    Create and save user and sending response to service
     * @method:         register to save the user
     * @param:          req,res for service
     */

    register = (req, res) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            // To validate the data entered by user
            const registerValidation = validation.registerValidation.validate(user);
            if (registerValidation.error){
                return res.status(422).json({
                    success: false,
                    message: "validation failed", 
                })
            }
            userService.registerUser(user, (error, data) => {
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: error,
                    });
                } else{
                    return res.status(201).json({
                        success: true, 
                        message: "User Registered",
                        data: data,
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                data: null,
            });
        }
    }

    /**
     * @description:    retrieving login info from user by email and password
     * @method:         login
     * @param:          req,res for service
     */

     login = (req, res) => {
        try{
            const loginDetails = {
                email: req.body.email,
                password: req.body.password
            };

            // To validate the data entered by user
            const loginValidation = validation.loginValidation.validate(loginDetails);
            if (loginValidation.error){
                return res.status(422).json({
                    success: false,
                    message: "validation failed", 
                })
            }
            userService.loginUser(loginDetails, (error, token) => {
                if (error){
                    return res.status(400).json({
                        message: error,
                        success: false,
                    })
                }
                else {
                    return res.status(201).json({
                        message: 'Login Success',
                        success: true,
                        token: token
                        
                    });
                }
            });
        }
        catch(error) {
            return res.status(500).json({
                message: "Internal server error",
                success: false,
                data: null
            });
        }

    }

    /**
     * @description:    Send mail to the user registered email with the token
     * @method:         forgotPassord
     * @param:          req,res for service
     */
     forgotPassword = (req, res) => {
        try{
            const user = {
                email: req.body.email
            }
            userService.forgotPassword(user, (error, data) => {
                if (error){
                    return res.status(400).json({
                        message: error,
                        success: false,
                    })
                }
                else {
                    const forgotPasswordMessage = {
                        email: user.email,
                        subject: 'Forgot Password Link',
                        html:` 
                           <p>${process.env.RESET_URL}/resetPassword/${data}</p>
                         `
                    }
                    nodemailer.sendEmail(forgotPasswordMessage);
                    return res.status(250).json({
                        message: "Mail Sent Successful",
                        success: true
                    });
                }
            });
        }
        catch(error) {
            return res.status(500).json({
                message: "Internal server error",
                success: false,
                data: null
            });
        }

    }
}
module.exports = new Controller();