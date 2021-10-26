/**
 * @module:         service
 * @file:           user.service.js
 * @description:    callbacks from the model and comparision of passwords 
 * @author:         Yash
 */

const userModel = require('../models/user.model.js')

class userService {
    /**
     * @description:    registerUser send response to controller
     * @method:         registerUser to save the user
     * @param:          user, callback for controller
     */
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        });
    };
}
module.exports = new userService();
  