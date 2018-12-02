const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post('/', async (req, res) => {
    var task = new Task(req.body);
    task.isComplete = false;
    await task.save();
    res.json({state: 'success'});
});

router.get('/:id', async (req, res) => {
    res.json(await Task.findById(req.params.id));
});

router.put('/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({state: 'updated'});
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({state: 'deleted'});
});

module.exports = router;