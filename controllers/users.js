const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { NODE_ENV, JWT_SECRET } = process.env;
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');

const getUserInfo = (req, res, next) => {
    User.findById(req.user._id)
        .orFail(new BadRequestError('Нет пользователя с таким id'))
        .then((user) => res.status(200).send(user))
        .catch(next);
};
const createUser = (req, res, next) => {
    const {
        name,
        email,
        password,
    } = req.body;
    bcrypt.hash(password, 10, (error, hash) => {
        User.findOne({ email })
            .then((user) => {
                if (user) return next(new ConflictError('Пользователь уже существует'));
                return User.create({
                    name, email, password: hash,
                })
                    .then((newUser) => res.status(200).send({
                        name: newUser.name,
                        email: newUser.email,
                        _id: newUser._id,
                    }));
            })
            .catch(next);
    });
};
const login = (req, res) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password)
        .then((user) => {
            res.send({
                token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' }),
            });
        })
        .catch((err) => {
            res
                .status(401)
                .send({ message: err.message });
        });
};

const updateUser = (req, res, next) => {
    const {
        name, email
    } = req.body;

    User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                throw new BadRequestError(err.message);
            }
            return next(err);
        })
        .then((user) => {
            if (!user) {
                throw new BadRequestError('Не удалось найти пользователя');
            }
            return res.status(200).send(user);
        })
        .catch(next);
};

module.exports = {
    createUser,
    login,
    getUserInfo,
    updateUser,
};
