const { expect } = require('chai');
const request = require('request');
const url = 'http://localhost:3000/api/login';


testUser = {
    user: 'bohdan',
    password: '12345'
}

describe(`Testing user sign in input: {user: '${testUser.user}', password: '${testUser.password}'}`, function () {
    it('test POST request to sign in api and get first internal page in responce', function (done) {
        request.post({ url: url, form: testUser }, function (error, response, anotherThing) {
            let validation;
            let responseObj;
            try {
                responseObj = JSON.parse(anotherThing);
                console.log('error');
                console.log(arguments[0]);
                console.log('statusCode');
                console.log(responseObj.statusCode);
                validation = false;
            } catch {
                validation = true;
            }
            expect(validation).to.equal(true);
            done();
        });
    });
});