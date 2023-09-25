let express = require('express');
let app = express();
let port = process.env.port ||3000;
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'views'), {index: "home"}));
app.set('views', 'views');
app.set('view engine', 'ejs')



require('./dbConnection.js');
let router = require('./routes/router.js');


app.use('/api', router)
app.use('/',router)



// Define routes and middleware here

app.listen(port, ()=>{
    //upon server start this logic will be fired
    console.log('server started using port: ' + port);
});