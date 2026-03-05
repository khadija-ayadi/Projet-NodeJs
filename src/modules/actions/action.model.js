const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  client:  { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  agent:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type:    { type: String, enum: ['call', 'email', 'letter', 'visit', 'other'], required: true },
  note:    { type: String },
  date:    { type: Date, default: Date.now },
  result:  { type: String, enum: ['pending', 'promise', 'refused', 'no_answer'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Action', actionSchema);