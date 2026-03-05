const service = require('./action.service');

exports.create      = async (req, res) => { try { res.status(201).json(await service.create(req.body, req.user.id)); } catch(e) { res.status(400).json({ error: e.message }); }};
exports.getAll      = async (req, res) => { try { res.json(await service.getAll()); } catch(e) { res.status(500).json({ error: e.message }); }};
exports.getByClient = async (req, res) => { try { res.json(await service.getByClient(req.params.clientId)); } catch(e) { res.status(500).json({ error: e.message }); }};
exports.update      = async (req, res) => { try { res.json(await service.update(req.params.id, req.body)); } catch(e) { res.status(400).json({ error: e.message }); }};
exports.delete      = async (req, res) => { try { await service.delete(req.params.id); res.json({ message: 'Deleted' }); } catch(e) { res.status(500).json({ error: e.message }); }};