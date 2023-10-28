const sqlite = require('sqlite3');

const interventionSchema = new sqlite.Schema({
  interventionType: String,
  percentageCovered: Number,
});

const Intervention = sqlite.model('Intervention', interventionSchema);

module.exports = Intervention;
