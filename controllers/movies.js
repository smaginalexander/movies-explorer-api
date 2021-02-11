const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');

const createMovie = (req, res, next) => {
    const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        nameRU,
        nameEN } = req.body;
    const owner = req.user._id;
    Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        owner,
        nameRU,
        nameEN
    })
        .then((movie) => res.status(200).send(movie))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new BadRequestError('Переданы некорректные данные'));
                return;
            }
            next(err);
        });
};

const getMovies = (req, res, next) => {
    Movie.find({})
        .then((movie) => res.status(200).send(movie))
        .catch(next);
};

const deleteMovie = (req, res, next) => {
    Movie.findByIdAndRemove(req.params.movieId)
        .then((movie) => {
            if (!movie) {
                throw new NotFoundError('Нельзя удалить это фильм');
            } else {
                res.send({ data: movie });
            }
        })
        .catch(next);
};

module.exports = {
    getMovies,
    createMovie,
    deleteMovie,
};