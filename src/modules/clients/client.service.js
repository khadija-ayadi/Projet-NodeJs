const Client = require('./client.model');

exports.create  = (data) => Client.create(data);
exports.getAll  = () => Client.find();
exports.getById = (id) => Client.findById(id);
exports.update  = (id, data) => Client.findByIdAndUpdate(id, data, { new: true });
exports.delete  = (id) => Client.findByIdAndDelete(id);