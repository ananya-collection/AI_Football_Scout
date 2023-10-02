let client = require('../dbConnection.js');
let usr_collection = client.db('AIFootballScout').collection('Users');

console.log("You successfully connected to AIFootballScout Collection!");

  function signUp_post(user, callback){
    //Fetch db collection inside post function
    let collection = usr_collection.getCollection();
    collection.insertOne(user, callback);
    console.log("Record inserted successfully");
  }

module.exports = {signUp_post}