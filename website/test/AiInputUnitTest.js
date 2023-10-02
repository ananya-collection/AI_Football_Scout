const { expect } = require('chai');
const request = require('request');
const urlAiApi = 'http://localhost:3000/getdataforai';
const urlAiApi_delete = 'http://localhost:3000/api/deleteaftertest';
const urlReduceQueries = 'http://localhost:3000/api/queryreduce';

// testing AI predictions api with 80 possible user inputs
const availablePositions = ['Attacker', 'Defender', 'Midfielder', 'Goalkeeper'];
const availableAgeGroups = ['20-23 age', '24-30 age', 'age above 30', 'age below 20'];
const availableCategories = ['prospective', 'average', 'belowAverage', 'lowAppereances', 'top'];

let testingValues = [];

for (j = 0; j < availablePositions.length; j++) {
    for (n = 0; n < availableAgeGroups.length; n++) {
        for (m = 0; m < availableCategories.length; m++) {
            testingValues.push({
                position: availablePositions[j],
                ageGroup: availableAgeGroups[n],
                playerCategory: availableCategories[m]
            })
        }
    }
};
let successTests = 0;

testingValues.forEach(function (value) {
    describe(`Testing input: {position: '${value.position}', ageGroup: '${value.ageGroup}', playerCategory: '${value.playerCategory}'}`, function () {
        it('test POST request to AI algorithm and get page in responce', function (done) {
            request.post({ url: urlAiApi, form: value, headers: {'cookie': 'type=unittests; username=bohdan'}}, function (error, response, anotherThing) {
                let validation;
                try {
                    responseObj = JSON.parse(anotherThing);
                    console.log('error');
                    console.log(arguments[0]);
                    console.log('statusCode');
                    console.log(responseObj.statusCode);
                    validation = false;
                } catch {
                    validation = true;
                    successTests++;
                }
                expect(validation).to.equal(true);
                done();
            });
        });
    });
});

describe(`DELETE values after test success POST inputs`, function () {
    it('DELETE after test POST status code 202', function (done) {
        request.delete({ url: urlAiApi_delete, form: { successTests: successTests, type: 'aiinput' },headers: {'cookie': 'type=unittests; username=bohdan'} }, function (error, response, anotherThing) {
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

describe(`PUT 80 spent testing requests quota back to user`, function () {
    it(`returning 80 spent testing quota using PUT status code 202`, function (done) {
        request.put({ url: urlReduceQueries, form: { action: successTests }, headers: {'cookie': 'type=unittests; username=bohdan'}}, function (error, response, anotherThing) {
            let responseObj = JSON.parse(anotherThing);
            let responseCode = responseObj.statusCode;
            console.log(arguments[2]);
            expect(responseCode).to.equal(202);
            done();
        });
    });
});


// testing user query quota reducing method
describe('test PUT user query quota reducing functional', function () {
    it('test PUT user query quota status code 202', function (done) {
        request.put({ url: urlReduceQueries, form: { action: -1 }, headers: {'cookie': 'type=unittests; username=bohdan'}}, function (error, response, anotherThing) {
            let responseObj = JSON.parse(anotherThing);
            let responseCode = responseObj.statusCode;
            console.log(arguments[2]);
            expect(responseCode).to.equal(202);
            done();
        });
    });
});

describe('PUT-1 to return testing spend to user quota', function () {
    it('returning -1 testing PUT to user quota status code 202', function (done) {
        request.put({ url: urlReduceQueries, form: { action: 1 }, headers: {'cookie': 'type=unittests; username=bohdan'}}, function (error, response, anotherThing) {
            let responseObj = JSON.parse(anotherThing);
            let responseCode = responseObj.statusCode;
            console.log(arguments[2]);
            expect(responseCode).to.equal(202);
            done();
        });
    });
});
