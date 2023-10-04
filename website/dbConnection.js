const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const uri = "mongodb+srv://s223306781:hsqvYEXtTbQP6tyU@cluster0.owsu92k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
     serverApi: {
         version: ServerApiVersion.v1,
         strict: true,
         deprecationErrors: true,
     }
 });


const connect = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('MongoDB is connected');
            })
            .catch(err => {
                console.error('MongoDB connection failure', err);
            });

client.connect();

module.exports =  client, connect; 