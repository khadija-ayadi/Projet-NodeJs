const Payment = require('./payment.model');
const Invoice = require('../invoices/invoice.model');

exports.record = async (data, userId) => {
  const payment = await Payment.create({ ...data, recordedBy: userId });
  const invoice = await Invoice.findById(data.invoice);
  const totalPaid = await Payment.aggregate([
    { $match: { invoice: invoice._id } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  const paid = totalPaid[0]?.total || 0;
  const newStatus = paid >= invoice.amount ? 'paid' : 'partial';
  await Invoice.findByIdAndUpdate(data.invoice, { status: newStatus });
  return payment;
};

exports.getAll = () => Payment.find().populate('invoice').populate('recordedBy', 'name');
exports.getByInvoice = (invoiceId) => Payment.find({ invoice: invoiceId });