//import the express library
let express = require('express');
//initialize an express application
let app = express();
//set the server port. Initially, it tries to use the PORT environment variable value,but if it doesn't exist/undefined, it uses 3000 by default as the port
let port = process.env.PORT || 3000;
let db = require('./dbConnection');
let router = require('./routers/router');

//by using the current directory, static files (like HTML, CSS, images)are served; this directory is root to location of our project
app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//server is referencing the router
app.use('/', router);