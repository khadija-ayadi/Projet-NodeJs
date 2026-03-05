const Invoice = require('./invoice.model');

exports.create  = (data) => Invoice.create(data);
exports.getAll  = () => Invoice.find().populate('client', 'name email');
exports.getById = (id) => Invoice.findById(id).populate('client');
exports.update  = (id, data) => Invoice.findByIdAndUpdate(id, data, { new: true });
exports.updateStatus = (id, status) => Invoice.findByIdAndUpdate(id, { status }, { new: true });
exports.delete  = (id) => Invoice.findByIdAndDelete(id);