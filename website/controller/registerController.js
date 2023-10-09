let registerModel = require('../model/register.js')

// async function signUp(req, res) {
//   try{
//       const userdt = req.body

//       if(userdt.password === userdt.cnfpassword){
//         let Userobj = await registerModel.insertRecords(userdt,request);
        
//         if( Userobj[0].user !=null && Userobj[0].email !=null && Userobj[0].password !=null){
//           return { statusCode: 201, message: 'Record inserted successfully' }
//         }
//         else{
//           return { statusCode: 404, message: 'Record insertion in database failed' }
//         }    
//       }
//     }
//   catch (error) {
//         throw (error)
//     }
// } 
// module.exports = { signUp }; 

async function signUp(req, res) {
  try{
    const formName = formName.req.body;
    const formEmail = formEmail.req.body;
    const formPswd = formPswd.req.body;
    const formConPswd = formConPswd.req.body;
    const usrdt= {user: formName, email:formEmail, password:formPswd}

      if(formPswd === formConPswd){
        let Userobj = await registerModel.insertRecords(usrdt,request);
        
        if( Userobj.formName !=null && Userobj.formEmail !=null && Userobj.formPswd !=null){
          return { statusCode: 201, data:Userobj ,message: 'Record inserted successfully' }
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