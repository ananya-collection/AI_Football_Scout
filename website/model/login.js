
let client = require('../dbConnection.js');
let usersCollection = client.db('AIFootballScout').collection('Users');

async function findRecords(request) {
    try {
        let loginedUser = await usersCollection.find(request).toArray()
        return loginedUser
    } catch (error) {
        throw error;
    }
}
module.exports = {findRecords}