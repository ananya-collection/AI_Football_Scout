let client = require('../dbConnection.js');
let aiCollectionInput = client.db('AIFootballScout').collection('AiModelDataInput');
console.log("You successfully connected to AiModelDataInput Collection!");


function getDataForPrediction(request, callback) {
    callback = aiCollectionInput.find(request).toArray(callback);
}

module.exports = { getDataForPrediction }