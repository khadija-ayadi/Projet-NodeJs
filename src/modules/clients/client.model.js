const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true, unique: true },
  phone:   { type: String },
  address: { type: String },
  status:  { type: String, enum: ['active', 'inactive', 'litigieux'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);