let express = require('express');
let app = express();
let port = process.env.port ||3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public_html'), {index: "home.html"}));
app.set('view engine', 'html');





app.listen(port, ()=>{
    //upon server start this logic will be fired
    console.log('server started');
});