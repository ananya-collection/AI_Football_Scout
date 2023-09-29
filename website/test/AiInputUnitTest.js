const { expect } = require('chai');
const request = require('request');
let url = 'http://localhost:3000/getdataforai';
let url_delete = 'http://localhost:3000/api/deleteaftertest';

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

// unit testing all possible inputs
testingValues.forEach(function (value) {
    describe(`Testing input: {position: '${value.position}', ageGroup: '${value.ageGroup}', playerCategory: '${value.playerCategory}'}`, function () {
        it('test POST request to AI algorithm and get page in responce', function (done) {
            request.post({ url: url, form: value, headers: {'cookie': 'type=unittests; username=bohdan'}}, function (error, response, anotherThing) {
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
            this.timeout(4000)
        });
    });
});

// deleting testing inputs
describe(`DELETE values after test success POST inputs`, function () {
    it('DELETE after test POST status code 202', function (done) {
        request.delete({ url: url_delete, form: { successTests: successTests } }, function (error, response, anotherThing) {
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