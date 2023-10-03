const { expect } = require('chai');
const request = require('request');
const url = 'http://localhost:3000/api/contact';
const url_delete = 'http://localhost:3000/api/deleteaftertest';

// Unit tests API for collecting user queries using Contact Us page and deleting test values. 
const testRequests = [{
    name: 'UnitTest1',
    email: 'unittest1@gmail.com',
    message: 'hey, Im first unit test'
},
{
    name: 'UnitTest2',
    email: 'unittest2@gmail.com',
    message: 'hey, Im second unit test'
},
{
    name: 'UnitTest3',
    email: 'unittest3@gmail.com',
    message: 'hey, Im third unit test'
}];

let contactsToDelete = [];


testRequests.forEach(function (value) {
    describe(`Testing input: {name: '${value.name}', email: '${value.email}', message: '${value.message}'}`, function () {
        it('test POST request to ContactUs', function (done) {
            request.post({ url: url, form: value }, function (error, response, anotherThing) {
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
    contactsToDelete.push(value.email)
});

describe(`DELETE values after test success POST inputs`, function () {
    it('DELETE after test POST status code 202', function (done) {
        request.delete({ url: url_delete, form: { contactsToDelete: contactsToDelete, type: 'contact' }, headers: { 'cookie': 'type=unittests; username=bohdan' } }, function (error, response, anotherThing) {
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
