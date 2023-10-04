const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// let client = require('../dbConnection.js');
// let collection= client.db('AIFootballScout').collection('Users');


const registerSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,  
})


/*  Hash the password before we even save it to the database */
registerSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });
  
  /* compare password in the database and the one that the user type in */
  registerSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);

  }

// const Register= collection;
module.exports = mongoose.model('Users', registerSchema);