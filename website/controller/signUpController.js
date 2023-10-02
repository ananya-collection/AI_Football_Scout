let collection = require('../model/signUpModel');

const signUp_post = (req, res)=> {
    let name = req.body.nameField;
    console.log(name)
    let email = req.body.email;
    console.log(email)
    let password = req.body.password;
    console.log(password)

    let user= {
        "name": name,
        "email": email,
        "password": password
    }
    collection.signUp_post(user, (err, result)=>{
        if(!err){
            res.json({statusCode:201, data:result, message:'success'});
        }
        else {
            res.json({ statusCode: 500, message: 'Internal server error' });
        }
    });
}
    
    module.exports = {signUp_post}