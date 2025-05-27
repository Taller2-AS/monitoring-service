const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  email: { type: String, default: '' },
  error: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Error', errorSchema);
