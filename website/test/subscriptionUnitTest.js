const {expect} = require("chai");
const request = require("request");

let url = 'http://localhost:3000/subscription'


describe('testing Subscription page rendering', function() {
    it('testing if subscription page renders successfully', function(done) {
        this.timeout(100000);
        const options = {
            url: url,
            headers: {
                'cookie': 'type=unittests; username=bohdan'
            }
        };

        request(options, function(err, res, anotherThing) {
            console.log(res.statusCode);
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});

