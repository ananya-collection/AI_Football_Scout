const { ObjectId } = require('mongodb');
let registerModel = require('../model/register.js')

async function signUp(req, res) {
  try{
      const { user, email, password, cnfpassword } = req.body

      if(password === cnfpassword){
        let Userobj = await registerModel.insertRecords({ name: user }, { email: email }, { password: password });
        
        if( Userobj[0].user !=null && Userobj[0].email !=null && Userobj[0].password !=null){
          return { statusCode: 201, message: 'Record inserted successfully' }
        }
        else{
          return { statusCode: 404, message: 'Record insertion in database failed' }
        }    
      }
    }
  catch (error) {
        throw (error)
    }
} 
module.exports = { signUp }; 
  
