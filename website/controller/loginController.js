const { ObjectId } = require('mongodb');
let loginModel = require('../model/login.js')

async function login(req, res) {
    try {
        const { email, password } = req.body
        let userObj = await loginModel.findRecords({ email: email }, { password: password });

        if (userObj.length === 0) {
            return { statusCode: 404, message: 'User not found' }
        }
        else {

            if (userObj[0].email === email && userObj[0].password === password) {
                return { statusCode: 202, user: userObj[0].user, message: 'Login was successful' }
            }

            if (userObj[0].email === email && userObj[0].password !== password) {
                return { statusCode: 401, message: 'Invalid password' }
            }
        }

    }
    catch (error) {
        throw (error)
    }
}
module.exports = { login }; 