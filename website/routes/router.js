let express = require("express");
let router = express.Router();
let controller = require('../controller/kmeansController.js')

router.post('/getdataforai', (req, res) => {
    controller.getPrediction(req, res);
});

router.get('/',(req,res,next) => {
    res.render('home')
})

router.get('/about',(req,res,next) => {
    res.render('about')
})

router.get('/contactus',(req,res,next) => {
    res.render('contactus')
})

router.get('/blog',(req,res,next) => {
    res.render('blog')
})

router.get('/subscription',(req,res,next) => {
    res.render('subscription')
})

router.get('/dashboardinput',(req,res,next) => {
    res.render('dashboardinput')
})

router.get('/requestshistory',(req,res,next) => {
    res.render('requestshistory')
})

router.get('/userprofile',(req,res,next) => {
    res.render('userprofile')
})

module.exports = router;