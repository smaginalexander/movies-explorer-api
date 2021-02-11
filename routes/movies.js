const router = require('express').Router();
const {
    movieValidation } = require('../middlewares/validation');
const {
    getMovies,
    createMovie,
    deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.get('/movies', auth, getMovies);
router.post('/movies', movieValidation, auth, createMovie);
router.delete('/movie/:movieId', auth, deleteMovie);
module.exports = router;