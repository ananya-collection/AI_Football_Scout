let collection = require('../model/loginModel');

const login_post = (req, res)=> {
    let user = req.body;
    console.log(user)
    collection.login_post(user, (err, result)=>{
        if(!err){
          res.json({statusCode:201, data:result, message:'success'});
        }
        else {
          res.json({ statusCode: 500, message: 'Internal server error' });
        }
    });
}

module.exports = {login_post}