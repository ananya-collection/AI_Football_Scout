let express = require("express");
let router = express.Router();
let controller = require('../controller/kmeansController.js')

router.get('/getdataforai', (req, res) => {
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



module.exports = router;