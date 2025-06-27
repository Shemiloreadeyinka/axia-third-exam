const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  fullName:    { type: String, required: true },
  address:     { type: String },
  dateOfBirth: { type: Date },
  idNumber:    { type: String }
});

module.exports = mongoose.model('KYC', kycSchema);
