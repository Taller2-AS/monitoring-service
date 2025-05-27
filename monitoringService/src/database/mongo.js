const mongoose = require('mongoose');

module.exports = async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
