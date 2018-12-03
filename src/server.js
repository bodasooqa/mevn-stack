const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

const app = express();
mongoose.connect('mongodb://localhost:27017/node-app', { useNewUrlParser: true })
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'bodasooqa',
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

// Routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/user', require('./routes/user'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.end('Express');
});
app.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user) {
        if (err) return next(err);
        if (!user) return res.send('Incorrect password or email');
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/admin');
        });
    })(req, res, next);
});
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/');
    }
};

app.get('/admin', auth, (req, res) => {
    res.send('Admin')
});

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});