const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
    throw new AuthError('Необходима авторизация');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return handleAuthError(res);
    }

    const token = extractBearerToken(authorization);
    let payload;

    try {
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    } catch (err) {
        return handleAuthError(res);
    }

    req.user = payload;

    next();
};