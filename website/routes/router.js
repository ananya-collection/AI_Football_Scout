let express = require("express");
let router = express.Router();
let controller = require('../controller/kmeansController.js');
const cons = require("consolidate");

router.post('/getdataforai', (req, res) => {
    controller.getPrediction(req)
    .then((response) => {
        // Access the response data here
        //console.log(response.statusCode);
        //console.log(response.data);
        //console.log(response.message);
        players = response.data.predictions
        let position = req.body.position
        let ageGroup = req.body.ageGroup
        let playerCategory = req.body.playerCategory
        players.position = position.toLowerCase();
        players.ageGroup = ageGroup.toLowerCase();
        players.playerCategory = playerCategory.toLowerCase();
        
        res.render('outputdashboard',{players:players})

    })
    .catch((error) => {
        // Handle errors here
        console.error(error.statusCode);
        console.error(error.data);
        console.error(error.message);
    });
    
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

router.get('/dashboardoutput',(req,res,next) => {
    res.render('outputdashboard')
})

router.get('/requestshistory',(req,res,next) => {
    res.render('requestshistory')
})

router.get('/userprofile',(req,res,next) => {
    res.render('userprofile')
})

router.get('/playerStats', (req, res) => {
    const playerId = req.query.playerId; // Get the player's ID from the query parameter
    (async () => {
        try {
            const playerStats = await controller.getPlayerData(playerId);
            console.log("Player found is ", playerStats);
            res.render('playerprofile', { playerId: playerId, playerStats: playerStats[0] });
        } catch (error) {
            console.error("Error:", error);
        }
    })();
    
   
});

module.exports = router;