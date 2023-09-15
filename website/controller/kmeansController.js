let aiModel = require('../model/kmeans.js')
var bson = require('bson');

function getPrediction(req, res) {
    console.log(req.body)
    let position = req.body.position; // 'Attacker','Defender','Midfielder','Goalkeeper'
    let ageGroup = req.body.ageGroup; // '20-23 age','24-30 age', 'age above 30', 'age below 20'
    let playerCategory = req.body.playerCategory // prospective, average, belowAverage, lowAppereances,'top'
    let request = { 'position': { '$eq': position }, 'age_group': { '$eq': ageGroup } };
    try {
        aiModel.getDataForPrediction(request).then(function (result) {
            let aiData = aiModel.convertDataForPrediction(result);
            let dbRawData = result;

            aiModel.getPrediction(aiData).then(function (result) {
                let predictions = aiModel.convertPrediction(result, position)[playerCategory];
                output = { position: position, ageGroup: ageGroup, playerCategory: playerCategory, predictions: [] };
                for (var i = 0; i < predictions.length; i++) {
                    output.predictions.push(dbRawData[predictions[i]])
                }
                res.json({ statusCode: 201, data: output, message: 'success' });
            });
        });
    }
    catch (error)
    {
        res.json({ statusCode: 500, data: error, message: 'error' });
    }
};


module.exports = { getPrediction }
