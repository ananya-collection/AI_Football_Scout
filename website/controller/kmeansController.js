let aiModel = require('../model/kmeans.js')
var bson = require('bson');

const availablePositions = ['Attacker', 'Defender', 'Midfielder', 'Goalkeeper'];
const availableAgeGroups = ['20-23 age', '24-30 age', 'age above 30', 'age below 20'];
const availableCategories = ['prospective', 'average', 'belowAverage', 'lowAppereances', 'top'];


function getPrediction(req, res) {
    console.log(req.body)
    let position = req.body.position;
    let ageGroup = req.body.ageGroup;
    let playerCategory = req.body.playerCategory;

    if (availablePositions.includes(position) && availableAgeGroups.includes(ageGroup) && availableCategories.includes(playerCategory)) {

        let request = { 'position': { '$eq': position }, 'age_group': { '$eq': ageGroup } };
        try {
            aiModel.getDataForPrediction(request).then(function (result) {
                let aiData = aiModel.convertDataForPrediction(result);
                let dbRawData = result;

                aiModel.getPrediction(aiData).then(function (result) {
                    let predictions = aiModel.convertPrediction(result, position)[playerCategory];
                    let today = new Date().toLocaleDateString()

                    output = { requestDate:today, position:position, ageGroup:ageGroup, playerCategory:playerCategory, predictions:[] };
                    
                    for (var i = 0; i < predictions.length; i++) {
                        output.predictions.push(dbRawData[predictions[i]])
                    }

                    aiModel.insertAiRequest(output, (err, result) => {
                        if (!err) {
                            res.json({ statusCode: 201, data: output, message: 'success' });
                        }
                    });
                    
                });
            });
        }
        catch (error) {
            res.json({ statusCode: 500, data: error, message: 'error' });
        }
    }
    else {
        output = { requestDate:today, position: position, ageGroup: ageGroup, playerCategory: playerCategory, predictions: [] }
        res.json({ statusCode: 400, data: output, message: 'bad request' });
    }
};


module.exports = { getPrediction }
