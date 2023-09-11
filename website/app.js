let express = require('express');
let app = express();
let port = process.env.port ||3000;
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views'), {index: "home.html"}));
app.set('view engine', 'html');
require('./dbConnection.js');
//let router = require('./routes/index.js');


// Define routes and middleware here

app.listen(port, ()=>{
    //upon server start this logic will be fired
    console.log('server started');
});