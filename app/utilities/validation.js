/**
 * @module:         utilities
 * @file:           validation.js
 * @description:    Contains the validation info for register and login
 * @author:         Yash
 */

 const Joi = require('joi');

 class validation {
     registerValidation =Joi.object({
         firstName: Joi.string()
             .min(2)
             .required()
             .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),
 
         lastName: Joi.string()
             .min(2)
             .required()
             .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),
 
         email: Joi.string()
             .pattern(new RegExp('^([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
             .required(),
 
         password: Joi.string()
             .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,16}$'))
             .required()
 
    });
}
module.exports = new validation();