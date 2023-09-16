const Contact = require('../model/contact'); // Import your Contact model



const ContactController = {
    saveContactUs: async (req, res) => {
        const { name, email, message } = req.body;
        if (!title || !body || !pic) {
          return res.status(422).json({ error: "Plase add all the fields" });
        }
        Contact.saveContactUs(req,res);
    },
};

module.exports = ContactController;