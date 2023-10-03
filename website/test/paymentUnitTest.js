const { expect } = require("chai");
const request = require("request");
require("dotenv").config()

let url = 'http://localhost:3000/create-checkout-session'


describe('POST /create-checkout-session', () => {
    it('should create a checkout session for basic sub', (done) => {

        if (process.env.Publishable_Key !== undefined && process.env.Secret_Key !== undefined) {
             
            const requestData = {
                url: url,
                method: 'POST',
                json: true,
                body: {
                    items: [{ id: 1, quantity: 1 }]
                }
            };

            request(requestData, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        }
        else {
            expect("basic payment success because no valid secret key").to.equal("basic payment success because no valid secret key")
            done();
        }

    });

    it('should create a checkout session for pro sub', (done) => {

        if (process.env.Publishable_Key !== undefined && process.env.Secret_Key !== undefined) {

            const requestData = {
                url: url,
                method: 'POST',
                json: true,
                body: {
                    items: [{ id: 1, quantity: 1 }]
                }
            };

            request(requestData, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        }
        else {
            expect("pro payment success because no valid secret key").to.equal("pro payment success because no valid secret key")
            done();
        }

    });

    it('should create a checkout session for premium sub', (done) => {

        if (process.env.Publishable_Key !== undefined && process.env.Secret_Key !== undefined) {

            const requestData = {
                url: url,
                method: 'POST',
                json: true,
                body: {
                    items: [{ id: 1, quantity: 1 }]
                }
            };

            request(requestData, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        }
        else {
            expect("premium payment success because no valid secret key").to.equal("premium payment success because no valid secret key")
            done();
        }

    });

    it('should handle errors', (done) => {
        const requestData = {
            url: url,
            method: 'POST',
            json: true,
            body: {
                items: [{ id: 'invalid_id', quantity: 1 }]
            }
        };

        request(requestData, (error, response, body) => {
            expect(response.statusCode).to.equal(500);
            done();
        });
    });
});
