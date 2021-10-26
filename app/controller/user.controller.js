/**
 * @module:         controller
 * @file:           user.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Yash
*/

const userService = require('../service/user.service')
const validation = require('../utilities/validation')

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
}
module.exports = new Controller();