const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://s223306781:hsqvYEXtTbQP6tyU@cluster0.owsu92k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect();
console.log("Pinged your deployment. You successfully connected to MongoDB!");

module.exports = client; 