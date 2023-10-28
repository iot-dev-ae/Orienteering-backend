const sqlite = require('post');

const patientSchema = new sqlite.Schema({
  id: String,
  password: String, // Store hashed password
  lastname:String,
  firstname:String,
  address:String,
  city:String,
  iban:String,
});

// Add methods to validate password, save user, etc.

const Patient = sqlite.model('User', patientSchema);

module.exports = Patient;
