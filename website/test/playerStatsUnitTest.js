const { expect } = require("chai");
const request = require("request");
const cheerio = require('cheerio');
playerId = '650788bb007b4835c7cff94e'
let url = `http://localhost:3000/playerStats?playerId=${playerId}`
console.log(url)
let controllerKmeans = require('../controller/kmeansController.js');


describe('testing player stats ', function () {
    it('testing for jadon sancho 2020 as an example', function (done) {
        const options = {
            url: url,
            headers: {
                'cookie': 'type=unittests; username=bohdan'
            }
        };

        request(options, function (err, res, anotherThing) {
            console.log(res.statusCode);
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});


describe('testing displaying player stats ', function () {
    it('should display player details such as name and age correctly', async function () {
        this.timeout(100000);
        let playerStats = await controllerKmeans.getPlayerData(playerId);
        playerStats = playerStats[0];

        const options = {
            url: url,
            headers: {
                'cookie': 'type=unittests; username=bohdan'
            }
        };

        const body = await new Promise((resolve, reject) => {
            request(options, function (err, res, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });

        const $ = cheerio.load(body);

        const playerNameElement = $('#playerName');
        const playerAgeElement = $('#playerAge');

        const playerNameText = playerNameElement.text()
        const playerAgeText = playerAgeElement.text()

        console.log("player name text ", playerNameText)

        expect(playerNameText).to.equal('Name: ' + playerStats.name);
        expect(playerAgeText).to.equal('Age: ' + playerStats.age.toString());

         
    });
    
});
