const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const User = require('./server/models/User');

authController = require('./server/controllers/auth.controller');

require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: process.env.SECRET_KEY,
    store: new FileStore(),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
}));

// require('./server/config/config.passport');
// app.use(passport.initialize());
// app.use(passport.session());

app.use(morgan('dev'));

// Routes
app.use('/api/tasks', require('./server/routes/tasks'));
app.use('/api/user', require('./server/routes/user'));

app.use('/', express.static(path.join(__dirname, 'home')));
app.use('/login', express.static(path.join(__dirname, 'admin')));

app.get('/', (req, res) => {
    res.end('Express');
});

app.post('/login', (req, res, next) => {
    const user = req.body;

    User.findOne({ username: user.username, password: user.password }, function (err, user) {
        console.log(user);
    });

    jwt.sign({user: user}, 'bodasooqa', (err, token) => {
        res.json({token: token});
    });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

app.get('/admin', verifyToken, (req, res) => {
    jwt.verify(req.token, 'bodasooqa', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({message: 'Admin', authData});
        }
    });
});

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});