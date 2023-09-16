let express = require("express");
let router = express.Router();
let controller = require('../controller/kmeansController.js')
const Contactcontroller = require('../controller/contactController');

router.get('/getdataforai', (req, res) => {
    controller.getPrediction(req, res);
});

router.post('/save-contact', (req, res) => {
    Contactcontroller.saveContactUs(req, res);
});

module.exports = router;