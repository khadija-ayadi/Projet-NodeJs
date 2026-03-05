const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

exports.register = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already in use');
  const hashed = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashed, role });
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user._id, name: user.name, role: user.role } };
};

exports.getAll = () => User.find().select('-password');