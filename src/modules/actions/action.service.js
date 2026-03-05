const Action = require('./action.model');

exports.create  = (data, agentId) => Action.create({ ...data, agent: agentId });
exports.getAll  = () => Action.find().populate('client', 'name').populate('invoice', 'amount status').populate('agent', 'name');
exports.getByClient = (clientId) => Action.find({ client: clientId });
exports.update  = (id, data) => Action.findByIdAndUpdate(id, data, { new: true });
exports.delete  = (id) => Action.findByIdAndDelete(id);