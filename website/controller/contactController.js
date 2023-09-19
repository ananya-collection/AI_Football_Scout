const ContactController = {
    // Define the saveContactUs function
    saveContactUs: async (req, res) => {
        try {
            const { name, email, message } = req.body;

            // Get the MongoDB collection where you want to store contact data
            const contactsCollection = mongoClient.db("AIFootballScout").collection("contacts");
    
            // Create the contact document
            const contactDocument = {
                name,
                email,
                message,
            };
    
            // Insert the document into the collection
            await contactsCollection.insertOne(contactDocument);

            res.status(201).json({ message: 'Contact saved successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while saving the contact.' });
        }
    },
};

module.exports = ContactController;