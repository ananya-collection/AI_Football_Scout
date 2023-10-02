require("dotenv").config()
const request = require('request');
let express = require("express");
let router = express.Router();

let controllerKmeans = require('../controller/kmeansController.js');
let controllerReduce = require('../controller/reduceController.js');
const cons = require("consolidate");
const contactController = require('../controller/contactController');
const ChangePasswordController = require('../controller/changePasswordController');
const userController = require('../controller/userController');
const authController = require('../controller/authController.js')
const reduceUrl = 'http://localhost:3000/api/queryreduce';


const stripe = require('stripe')(process.env.Secret_Key)

const { initializeSocket,shortlist } = require('../views/js/socketManager.js');


// Define a route for generating AI predictions
router.post('/getdataforai', (req, res) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
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

                res.render('dashboardoutput', { players: players });
                request.put({ url: reduceUrl, form: { action: -1 }, headers: {'cookie': `type=internal; username=${userName}`} });

            })
            .catch((error) => {
                // Handle errors here
                console.error(error.statusCode);
                console.error(error.data);
                console.error(error.message);
                res.json(error);
            });
    }
});

// Define a route for reducing user queries by 1 after success AI request
router.put('/api/queryreduce', (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        (async () => {
            try {
                let result = await controllerReduce.updateRecord(req, res)
                res.status(202).json({ statusCode: 202, data: result, message: 'success' });
            }
            catch (error) {
                res.status(500).json({ statusCode: 500, data: error, message: 'error' });
                throw error;
            }
        })();
    }
});

// Define a route for deleting records after testing
router.delete('/api/deleteaftertest', (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else { if (req.body.type === 'aiinput')
              controllerKmeans.deleteRecord(req, res)
           if (req.body.type === 'contact')
              contactController.deleteRecord(req, res)
    }
});

// Get users requests to AI amount
router.get('/api/getuserrequests', async (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        let result = await userController.getProfile(userName);
        res.status(201).json({ statusCode: 201, data: result[0].queries, message: 'success' });
    }
});

// Define a route for saving contact information
router.post('/api/contact', (req, res, next) => {
    contactController.saveContactUs(req, res)
});


router.get('/', (req, res, next) => {
    res.render('home')
})

router.get('/about', (req, res, next) => {
    res.render('about')
})

router.get('/contactus', (req, res, next) => {
    res.render('contactus')
})

router.get('/blog', (req, res, next) => {
    res.render('blog')
})

router.get('/subscription', (req, res, next) => {
    res.render('subscription')
})

router.get('/login', (req, res, next) => {
    res.render('loginSignup')
})

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

router.get('/dashboardinput', (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        res.render('dashboardinput')
    }
})

router.get('/dashboardoutput', (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        res.render('dashboardoutput')
    }
})

router.get('/requestshistory', (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        (async () => {

            try {
                const queries = await controllerKmeans.getQueries(req);
                res.render('requestshistory', { queries: queries })
            }
            catch (error) {
                console.error("Error:", error);
            }
        })();
    }
})

router.get('/userprofile', async (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        const userData = await userController.getProfile(userName);
        res.render('userprofile', { userData : userData})
    }
})

router.get('/changepassword', (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        res.render('changepassword')
    }
})

router.post('/api/change-password', (req, res, next) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        ChangePasswordController.changePassword(req, res, userName)
    }
})

router.get('/templogin', (req, res, next) => {
    // Temporary hardcoded logined user 
    res.cookie('username', 'bohdan');
    res.redirect('/dashboardinput')
    res.end()
});

router.get('/playerStats', (req, res) => {
    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        const playerId = req.query.playerId; // Get the player's ID from the query parameter
        (async () => {
            try {
                const playerStats = await controllerKmeans.getPlayerData(playerId);
                //    console.log("Player found is ", playerStats);
                res.render('playerprofile', { playerId: playerId, playerStats: playerStats[0] });
            } catch (error) {
                console.error("Error:", error);
            }
        })();
    }
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


router.get('/paymentsuccess', (req, res, next) => {
    res.render('paymentsuccess')
})


router.get('/paymentfailure', (req, res, next) => {
    res.render('paymentfailure')
})

router.get('/shortlist', (req, res, next) => {

    let userName = authController.userAuthorised(req)

    if (typeof userName === "undefined") {
        res.json({ statusCode: 401, message: 'no auth data in header' })
    }
    else {
        const shortlistArr = [];
        shortlist.forEach((jsonString) => {
          const parsedJSON = JSON.parse(jsonString);
          shortlistArr.push(parsedJSON);
        });
        
        console.log("shortlist view ", shortlistArr)
        res.render('shortlist', {shortlistArr : shortlistArr})
       
    }
})





module.exports = router;