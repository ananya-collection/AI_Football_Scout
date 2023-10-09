let request = require('request');
const {expect} = require('chai');
let url= "http://localhost:3000/register/api/register"
let id;
let usrdt= {user: "Ana",
            email: "testqxv@765.com",
            password:"12300"
}

describe('POST cat image', ()=>{
    it('it should post cat-image with description details', (done)=>{

        request.post({url:url, form:usrdt}, function(req,res){
            let userdt_body = JSON.parse(res.body);
            expect(userdt_body.message).to.contain("success");
            id = userdt_body.data.insertedId;
            done();
        }
        )
   })
})
       

