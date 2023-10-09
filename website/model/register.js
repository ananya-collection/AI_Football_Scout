let client = require('../dbConnection.js');
let usersCollection = client.db('AIFootballScout').collection('Users');

async function insertRecords(usrdt,request) {
    try {
        let UserToBeInserted = await usersCollection.insertOne(usrdt,request)
        return UserToBeInserted
    } catch (error) {
        throw error;
    }
}
module.exports = {insertRecords}