let mongoClient = require('../dbConnection.js');

const changePasswordController = {
    // Define the saveContactUs function
    changePassword: async (req, res, userName) => {
        try {
            const { currentPassword, newPassword } = req.body;

            // Get the MongoDB collection where you want to store contact data
            const collection = mongoClient.db("AIFootballScout").collection("Users");
    
              // Define the condition for finding the user by username
            const filter = { user : userName };

            // Find the user document
            const user = await collection.findOne(filter);

            if (!user) {
                res.status(422).json({
                    status : false,
                    message: 'User not found' 
                });
            return;
           }

           // Verify the current password
           const isPasswordValid = user.password === currentPassword; // Replace with your actual password field name

           if (!isPasswordValid) {
            res.status(422).json({ 
                message: 'Invalid current password',
                status : false,
            });
           return;
           }

          // Update the user's password
          const updateDoc = {
           $set: { password: newPassword }, // Replace 'password' with your actual password field name
           };

           // Update the record
           const result = await collection.updateOne(filter, updateDoc);
           res.status(202).json({ 
            statusCode: 202,
            message: 'Password changed successfully',
            status : true,
           });
        
        } 
        catch (error) {
         console.error('Error changing password', error);
        }
    },
};

module.exports = changePasswordController;