let collection = require('../model/loginModel');

const loginController = {
    login: async (req, res, next) => {
        try{
            const {email,password}=req.body
            collection.findOne({email:email}).then(post => {     
                res.render("post", {
                    email: email,
                    password: password
                });
                if(email === email && password === password){
                      console.log('success')
                     res.redirect('/dashboardinput')
                }else{
                    console.log('Failed')
                }
            });
        }
        catch (err)
        {
            next(err);
        }
    }}
    module.exports = loginController; 