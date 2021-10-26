/**
 * @module:         controller
 * @file:           user.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Yash
*/

const userService = require('../service/user.service')

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
            console.log(user)
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