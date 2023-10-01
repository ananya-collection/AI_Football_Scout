let mongoClient = require('../dbConnection.js');

const UserController = {
    // Define the saveContactUs function
    getProfile: async (searchUsername) => {
        try {
            // Get the MongoDB collection where you want to store contact data
            const collection = mongoClient.db("AIFootballScout").collection("Users");
    
           // Query for documents that match the username
          const query = { user: searchUsername };

         // Find documents that match the query
         const result = await collection.find(query).toArray();
         return result;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while saving the contact.' });
        }
    },
};

module.exports = UserController;