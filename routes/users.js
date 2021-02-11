const router = require('express').Router();
const {
    updateUserValidastion,
    createUservalidation,
} = require('../middlewares/validation');

const {
    getUserInfo,
    createUser,
    login,
    updateUser,
} = require('../controllers/users.js');

const auth = require('../middlewares/auth');

router.get('/users/me', auth, getUserInfo);
router.put('/users/me', updateUserValidastion, auth, updateUser);
router.post('/signup', createUservalidation, createUser);
router.post('/signin', createUservalidation, login);

module.exports = router;