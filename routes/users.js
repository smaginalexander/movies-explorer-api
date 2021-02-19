const router = require('express').Router();
const {
  updateUserValidastion,
  createUservalidation,
  loginUservalidation,
} = require('../middlewares/validation');

const {
  getUserInfo,
  createUser,
  login,
  updateUser,
} = require('../controllers/users.js');

const auth = require('../middlewares/auth');

router.get('/users/me', auth, getUserInfo);
router.patch('/users/me', updateUserValidastion, auth, updateUser);
router.post('/signup', createUservalidation, createUser);
router.post('/signin', loginUservalidation, login);

module.exports = router;
