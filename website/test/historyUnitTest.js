const {expect} = require("chai");
const request = require("request");
const cheerio = require("cheerio");

const model = require('../model/kmeans')

let url = 'http://localhost:3000/requestshistory'


describe('testing query history', function() {
    it('testing for query history', function(done) {
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


describe('testing query history rows', function() {
    it('testing number of rows in query history', async function() {
        this.timeout(100000);

        const url = 'http://localhost:3000/requestshistory'; // Replace with the actual URL
        const options = {
            url: url,
            headers: {
                'cookie': 'type=unittests; username=bohdan'
            }
        };

        // Make a request to get the HTML
        const htmlResponse = await new Promise((resolve, reject) => {
            request(options, function(err, res, html) {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            });
        });

        //console.log(htmlResponse);

        const $ = cheerio.load(htmlResponse);

        const rowCount = $('table.striped.responsive-table tbody tr').length;

        const tableLength = await model.getQueryHistoryRows();

        expect(rowCount).to.equal(tableLength);
    });
});