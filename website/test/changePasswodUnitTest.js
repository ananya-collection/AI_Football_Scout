const { expect } = require('chai');
const request = require('request');
const url = 'http://localhost:3000/api/change-password';

let originalPassword = '12345';
let currentPassword = '12345';
let testPasswords = [{
    currentPassword: currentPassword,
    newPassword: 'unittestpassword1',
},
{
    currentPassword: currentPassword,
    newPassword: 'unitTESTpassword2',
},
{
    currentPassword: currentPassword,
    newPassword: 'unittest24525password3',
}];


testPasswords.forEach(function (value) {
    value.currentPassword = currentPassword;
    describe(`Testing input: {currentPassword: '${value.currentPassword}', newPassword: '${value.newPassword}'}`, function () {
        it('test POST request to ChangePassword', function (done) {
            request.post({ url: url, form: value, headers: { 'cookie': 'type=unittests; username=bohdan' } }, function (error, response, anotherThing) {
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
                expect(successCode).to.equal(202);
                
                done();
            });
        });
    });
    currentPassword = value.newPassword;
});

describe(`Returning to original password`, function () {
        it('test POST request to ChangePassword', function (done) {
            request.post({ url: url, form: {currentPassword:testPasswords.pop().newPassword, newPassword:originalPassword}, headers: { 'cookie': 'type=unittests; username=bohdan' } }, function (error, response, anotherThing) {
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
                expect(successCode).to.equal(202);
                done();
            });
        });
    });
