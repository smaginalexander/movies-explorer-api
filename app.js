require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const NotFoundError = require('./errors/notFoundError');
const app = express();
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const PORT = 3000;
mongoose.connect('mongodb://localhost:27017/diplomdb', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors());

app.use('/', usersRouter);
app.use('/', moviesRouter);

app.use('*', (req, res, next) => {
    next(new NotFoundError('запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
    const { statusCode = 400, message } = err;
    console.log(err);
    res.status(statusCode)
        .send({
            message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
        });
    next();
});
app.use(errors());
app.use(errorLogger);
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});