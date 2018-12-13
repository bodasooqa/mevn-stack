const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

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

require('./config/config.passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/user', require('./routes/user'));

app.use('/', express.static(path.join(__dirname, '../../dist/home')));
app.use('/login', express.static(path.join(__dirname, '../../dist/login')));

// Routes
app.get('/', (req, res) => {
    res.send('admin');
});

app.use('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user) {
        if (err) return next(err);
        if (!user) return res.send('Incorrect password or email');
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect(303, '/admin');
        });
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/login');
    }
};

app.use('/admin', [auth, express.static(path.join(__dirname, '../../dist/admin'))]);

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});