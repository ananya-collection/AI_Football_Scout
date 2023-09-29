const { ObjectId } = require('mongodb');
let client = require('../dbConnection.js');
let reduceCollection = client.db('AIFootballScout').collection('Users');

async function updateRecord(req, res) {
    try {
        let action = parseInt(req.body.action);
        let cookieList = req.headers.cookie.split('; ');
        cookieList.forEach(function (value) {
            if (value.includes('username='))
                userName = value.split('username=')[1];

        })
        let result = await reduceCollection.updateOne({ user: userName}, { $inc: { "queries": action } })
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { updateRecord }