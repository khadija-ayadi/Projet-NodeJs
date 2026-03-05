const service = require('./payment.service');

exports.record = async (req, res) => {
  try { res.status(201).json(await service.record(req.body, req.user.id)); }
  catch(e) { res.status(400).json({ error: e.message }); }
};
exports.getAll = async (req, res) => {
  try { res.json(await service.getAll()); }
  catch(e) { res.status(500).json({ error: e.message }); }
};
exports.getByInvoice = async (req, res) => {
  try { res.json(await service.getByInvoice(req.params.invoiceId)); }
  catch(e) { res.status(500).json({ error: e.message }); }
};