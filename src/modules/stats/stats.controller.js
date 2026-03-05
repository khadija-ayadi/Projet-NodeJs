const service = require('./stats.service');
exports.getSummary = async (req, res) => {
  try { res.json(await service.getSummary()); }
  catch(e) { res.status(500).json({ error: e.message }); }
};