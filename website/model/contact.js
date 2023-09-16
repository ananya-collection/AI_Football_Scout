const client = require('../dbConnection.js');

  const  Contact = {
    saveContactUs: async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Connect to the MongoDB database
        await client.connect();

        // Get a reference to the contacts collection
        const contactsCollection = client.db('AIFootballScout').collection('contacts');

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
    } finally {
        // Close the database connection when done
        await client.close();
    }
   }
  };
module.exports = Contact;
