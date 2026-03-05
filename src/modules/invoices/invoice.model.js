const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  client:  { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  amount:  { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status:  { type: String, enum: ['pending', 'paid', 'overdue', 'partial'], default: 'pending' },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);