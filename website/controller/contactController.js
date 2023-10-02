let mongoClient = require('../dbConnection.js');

// Get the MongoDB collection where you want to store contact data
const contactsCollection = mongoClient.db("AIFootballScout").collection("ContactUsRequests");

const ContactController = {
    // Define the saveContactUs function
    saveContactUs: async (req, res) => {
        try {
            const { name, email, message } = req.body;

            // Create the contact document
            const contactDocument = {
                name,
                email,
                message,
            };

            // Insert the document into the collection
            await contactsCollection.insertOne(contactDocument);

            res.status(202).json({ statusCode: 202, message: 'Contact saved successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ statusCode: 500, message: 'An error occurred while saving the contact.' });
        }
    },

    // Deleting bogus contact us after stesting
    deleteRecord: async (req, res) => {
        try {
            let recordsToDelete = req.body.contactsToDelete;
            let deleteReq = { 'email': { '$in': recordsToDelete } };
            contactsCollection.deleteMany(deleteReq, (err, result) => {
                if (!err) {
                    res.json({ statusCode: 202, data: result, message: 'success' });
                };
            });
        } catch (error) {
            throw error;
        }
    }
};



module.exports = ContactController;