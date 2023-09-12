let express = require("express");
let router = express.Router();
let controller = require('../controller/kmeansController.js')

router.get('/getdataforai', (req, res) => {
    controller.getPrediction(req, res);
});

module.exports = router;