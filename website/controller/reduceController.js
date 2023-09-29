const { ObjectId } = require('mongodb');
let client = require('../dbConnection.js');
let reduceCollection = client.db('AIFootballScout').collection('Users');

async function updateRecord(req, res) {
    try {
        userName = req.body.userName
        let result = await reduceCollection.updateOne({ user: 'bohdan'},{ $inc: { "queries": -1 } })
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { updateRecord }