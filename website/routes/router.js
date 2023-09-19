require("dotenv").config()

let express = require("express");
let router = express.Router();
let controllerKmeans = require('../controller/kmeansController.js');
const cons = require("consolidate");



const stripe = require('stripe')(process.env.Secret_Key)


router.post('/getdataforai', (req, res) => {
    controllerKmeans.getPrediction(req)
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
        
        res.render('dashboardoutput',{players:players})

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

router.get('/login',(req,res,next) => {
    res.render('login')
})

router.get('/signup',(req,res,next) => {
    res.render('signup')
})

router.get('/dashboardinput',(req,res,next) => {
    res.render('dashboardinput')
})

router.get('/dashboardoutput',(req,res,next) => {
    res.render('dashboardoutput')
})

router.get('/requestshistory',(req,res,next) => {
    (async() =>{

        try{
            const queries = await controllerKmeans.getQueries(req);
            res.render('requestshistory',{queries:queries})
        }
        catch(error){
            console.error("Error:", error);
        }
    })();
   
})

router.get('/userprofile',(req,res,next) => {
    res.render('userprofile')
})

router.get('/playerStats', (req, res) => {
    const playerId = req.query.playerId; // Get the player's ID from the query parameter
    (async () => {
        try {
            const playerStats = await controllerKmeans.getPlayerData(playerId);
            console.log("Player found is ", playerStats);
            res.render('playerprofile', { playerId: playerId, playerStats: playerStats[0] });
        } catch (error) {
            console.error("Error:", error);
        }
    })();
    
   
});

const subPrices = new Map([
    [1, { priceInCents: 1999, name: "Tier 1 Sub" }],
    [2, { priceInCents: 3999, name: "Tier 2 Sub" }],
    [3, { priceInCents: 5999, name: "Tier 3 Sub" }]
  ])
  
router.post("/create-checkout-session", async (req, res) => {
try {
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: req.body.items.map(item => {
        const subPrice = subPrices.get(item.id)
        return {
        price_data: {
            currency: "aud",
            product_data: {
            name: subPrice.name,
            },
            unit_amount: subPrice.priceInCents,
        },
        quantity: item.quantity,
        }
    }),
    success_url: `${process.env.CLIENT_URL}/paymentsuccess`,
    cancel_url: `${process.env.CLIENT_URL}/paymentfailure`,
    })
    res.json({ url: session.url })
} catch (e) {
    res.status(500).json({ error: e.message })
}
})


router.get('/paymentsuccess',(req,res,next) => {
    res.render('paymentsuccess')
})


router.get('/paymentfailure',(req,res,next) => {
    res.render('paymentfailure')
})




module.exports = router;