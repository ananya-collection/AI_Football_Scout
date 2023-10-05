const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const uri = "mongodb+srv://s223306781:hsqvYEXtTbQP6tyU@cluster0.owsu92k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect();

// mongoose connection set-up
mongoose.connect(uri, {useNewUrlParser: true})
const db = mongoose.connection;
db.on("error", ()=>{console.log("Error in connection");})
db.once("open", ()=>{console.log("MongoDB connected");})


module.exports = client; 