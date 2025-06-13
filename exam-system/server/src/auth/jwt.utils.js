const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: '1d' }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};