const {expect} = require("chai");
const request = require("request");

let url = 'http://localhost:3000/create-checkout-session'


describe('POST /create-checkout-session', () => {
  it('should create a checkout session for basic sub', (done) => {
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
  });

  it('should create a checkout session for pro sub', (done) => {
    const requestData = {
      url: url,
      method: 'POST',
      json: true,
      body: {
        items: [{ id: 2, quantity: 1 }]
      }
    };

    request(requestData, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should create a checkout session for premium sub', (done) => {
    const requestData = {
      url: url,
      method: 'POST',
      json: true,
      body: {
        items: [{ id: 3, quantity: 1 }]
      }
    };

    request(requestData, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
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
