const redis = require('redis')
const client = redis.createClient()

/**
 * @module:         Redis
 * @file:           redis.js
 * @description:    Contains the cache info for getBookById
 * @author:         Yash
*/

class Redis{
    getBookById = (req, res, next) => {
        client.get(req.params.bookId, (error, result) => {
        if (error) {
            throw error;
        } else if (result) {
        res.status(200).send({
            message: 'Book successfully retrieved fom Redis',
            data: JSON.parse(result),
            success: true
        });
        } else {
        next();
        }
        });
    }

    setCache = (key, time, data) => {
        console.log(key, data)
        client.setex(key, time, data);
    };
    clearCache = (key) => {
        client.del(key)
    }
}
module.exports = new Redis()