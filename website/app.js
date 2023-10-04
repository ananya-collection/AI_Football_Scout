let express = require('express');

let app = express();
let port = process.env.port ||3000;
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');


let http = require('http').createServer(app);
const { initializeSocket } = require('./views/js/socketManager');
const io = initializeSocket(http);

// Set up middleware to attach io to req
app.use((req, res, next) => {
    req.io = io;
    next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'views'), {index: "home"}));
app.set('views', 'views');
app.set('view engine', 'ejs')

require('./dbConnection.js');
let router = require('./routes/router.js');


app.use('/api', router)
app.use('/',router)
app.use(cookieParser())



// Flash mssgs enabled
app.use(flash()); 
// Passport for authentication initialized
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});



http.listen(port, ()=>{
    //upon server start this logic will be fired
    console.log('server started using port: ' + port);
});
