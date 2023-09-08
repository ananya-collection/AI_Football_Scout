let express= require('express');
let app= express();
let portNum= process.env.port ||3000;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'html');

 app.get('/', (req, res)=> {
    console.log('hi');
     res.render('./home.html');
 });

app.listen(portNum, ()=>{
    //upon server start this logic will be fired
    console.log('server started');
});