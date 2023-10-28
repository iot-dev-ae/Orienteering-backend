const bcrypt = require('bcrypt');

async function hash(plainText) {
  const saltRounds = 10 // You can adjust this value based on your security requirements
  return bcrypt.hash(plainText, saltRounds);
}

async function verify(plainText, hashedText) {
    return bcrypt.compare(plainText, hashedText);
  }
  
  module.exports = {
    hash,
    verify,
  };