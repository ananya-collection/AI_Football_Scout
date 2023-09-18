let aiModel = require('../model/kmeans.js')
var bson = require('bson');

const availablePositions = ['Attacker', 'Defender', 'Midfielder', 'Goalkeeper'];
const availableAgeGroups = ['20-23 age', '24-30 age', 'age above 30', 'age below 20'];
const availableCategories = ['prospective', 'average', 'belowAverage', 'lowAppereances', 'top'];


async function getPrediction(req) {
    return new Promise((resolve, reject) => {
        console.log(req.body);
        let position = req.body.position;
        let ageGroup = req.body.ageGroup;
        let playerCategory = req.body.playerCategory;
        let today = new Date().toLocaleDateString();

        if (
            availablePositions.includes(position) &&
            availableAgeGroups.includes(ageGroup) &&
            availableCategories.includes(playerCategory)
        ) {
            let request = { 'position': { '$eq': position }, 'age_group': { '$eq': ageGroup } };
            try {
                aiModel.getDataForPrediction(request).then(function (result) {
                    let aiData = aiModel.convertDataForPrediction(result);
                    let dbRawData = result;

                    aiModel.getPrediction(aiData).then(function (result) {
                        let predictions = aiModel.convertPrediction(result, position)[playerCategory];

                        output = {
                            requestDate: today,
                            position: position,
                            ageGroup: ageGroup,
                            playerCategory: playerCategory,
                            predictions: [],
                        };

                        for (var i = 0; i < predictions.length; i++) {
                            output.predictions.push(dbRawData[predictions[i]]);
                        }

                        aiModel.insertAiRequest(output, (err, result) => {
                            if (!err) {
                                resolve({ statusCode: 201, data: output, message: 'success' });
                            } else {
                                reject({ statusCode: 500, data: err, message: 'error' });
                            }
                        });
                    });
                });
            } catch (error) {
                reject({ statusCode: 500, data: error, message: 'error' });
            }
        } else {
            output = { requestDate: today, position: position, ageGroup: ageGroup, playerCategory: playerCategory, predictions: [] };
            reject({ statusCode: 400, data: output, message: 'bad request' });
        }
    });
}

async function getPlayerData(req) {
    try {
        //console.log("req is ", req);
        const playerFound = await aiModel.getPlayerStats(req);
        //console.log("controller ", playerFound);
        return playerFound; 
    } catch (error) {
        throw error;
    }
}

async function getQueries(req){
    try {
        //console.log("req is ", req);
        const queries = await aiModel.getQueryHistory(req);
        //console.log("controller ", playerFound);
        return queries; 
    } catch (error) {
        throw error;
    }
}


module.exports = { getPrediction,getPlayerData, getQueries }
