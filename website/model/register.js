
let client = require('../dbConnection.js');
let usersCollection = client.db('AIFootballScout').collection('Users');

async function insertRecords(Userobj,request) {
    try {
        let UserToBeInserted = await usersCollection.insertOne(Userobj)
        return UserToBeInserted
    } catch (error) {
        throw error;
    }
}
module.exports = {insertRecords}

