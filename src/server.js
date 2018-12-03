const express = require('express');
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
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', require('./routes/tasks'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.end('Express');
});

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});