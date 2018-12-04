const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
    title: String,
    description: String,
    isComplete: Boolean
});

module.exports = mongoose.model('Task', Task);