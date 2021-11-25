const express = require('express');
require("dotenv").config();
// create express app
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to BookStore application."});
});



//Configuring the database
const dbConfig = require('./config/database.config.js');
dbConfig.connection();

require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port number : ${process.env.PORT}`);
});

module.exports = app;
