const router = require('express').Router();
const NotFoundError = require('../errors/notFoundError');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/', usersRouter);
router.use('/', moviesRouter);
router.use('/', auth);

router.use('*', (req, res, next) => {
  next(new NotFoundError('запрашиваемый ресурс не найден'));
});

module.exports = router;
