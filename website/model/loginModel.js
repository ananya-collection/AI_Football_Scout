let client = require('../dbConnection.js');
let usr_login_Collection = client.db('AIFootballScout').collection('Users');

console.log("You successfully connected to AIFootballScout Collection!");

  function login_post(user, callback){
    //Fetch db collection inside post function
    let collection = usr_login_Collection.getCollection();
    collection.insertOne(user, callback);
  }




module.exports = {login_post}