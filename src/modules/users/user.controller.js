const service = require('./user.service');

exports.register = async (req, res) => {
  try {
    const user = await service.register(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const data = await service.login(req.body);
    res.json(data);
  } catch (err) { res.status(401).json({ error: err.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
};