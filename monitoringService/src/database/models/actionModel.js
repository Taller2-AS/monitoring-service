const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  email: { type: String, default: '' },
  method: String,
  url: String,
  action: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Action', actionSchema);
