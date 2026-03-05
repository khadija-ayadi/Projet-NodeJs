const service = require('./client.service');

const handle = (fn) => async (req, res) => {
  try { res.json(await fn(req, res)); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create  = handle(async (req) => { const c = await service.create(req.body); return { status: 201, data: c }; });
exports.getAll  = handle(async () => service.getAll());
exports.getById = handle(async (req) => service.getById(req.params.id));
exports.update  = handle(async (req) => service.update(req.params.id, req.body));
exports.delete  = handle(async (req) => { await service.delete(req.params.id); return { message: 'Deleted' }; });