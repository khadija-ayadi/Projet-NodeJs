const Invoice = require('../invoices/invoice.model');
const Client  = require('../clients/client.model');
const Payment = require('../payments/payment.model');
const Action  = require('../actions/action.model');

exports.getSummary = async () => {
  const [totalClients, totalInvoices, invoicesByStatus, totalCollected, totalActions] = await Promise.all([
    Client.countDocuments(),
    Invoice.countDocuments(),
    Invoice.aggregate([{ $group: { _id: '$status', count: { $sum: 1 }, total: { $sum: '$amount' } } }]),
    Payment.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
    Action.countDocuments()
  ]);
  return { totalClients, totalInvoices, invoicesByStatus, totalCollected: totalCollected[0]?.total || 0, totalActions };
};