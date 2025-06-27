const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  kyc: { type: mongoose.Schema.Types.ObjectId, ref: 'KYC' }
});

module.exports = mongoose.model('User', userSchema);
