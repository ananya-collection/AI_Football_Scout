const { expect } = require('chai');
const request = require('request');
const url = 'http://localhost:3000/api/getuserrequests';


// Unit Test API for getting remaining user's requests to AI
describe(`Testing GET user request quota for notifications`, function () {
    it('Testing GET request to recieve status code 201', function (done) {
        request.get({ url: url, headers: { 'cookie': 'type=unittests; username=bohdan' } }, function (error, response, anotherThing) {
            let successCode;
            try {
                let responseObj = JSON.parse(anotherThing);
                successCode = responseObj.statusCode;
                console.log(arguments[2]);
            }
            catch
            {
                console.log('error');
                console.log(arguments[0]);
            }
            expect(successCode).to.equal(201);
            done();
        });
    });
});
