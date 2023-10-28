const sqlite = require('sqlite3');

const repaymentSchema = new sqlite.Schema({
  date: Date,
  patientId: String, // Reference to the Patient model
  commentary: String,
  interventionLocation: String,
  price: Number,
  interventionId: String,
  interventionType: String,
  percentageCovered: Number,
  amountRefunded: Number,
});

const Remboursement = sqlite.model('Repayment', repaymentSchema);

module.exports = Remboursement;

