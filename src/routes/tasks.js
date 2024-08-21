const express = require('express');
const { readTasks, writeTasks } = require('../utils/fileOperations');
const validateTask = require('../middleware/taskValidator');
const checkTaskExistence = require('../middleware/checkTaskExistence');
const router = express.Router();

// GET /tasks: Retrieve all tasks
router.get('/', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// POST /tasks: Add a new task
router.post('/', validateTask, (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        name: req.body.name,
        description: req.body.description || '',
        status: req.body.status,
        date: new Date().toISOString()
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// PUT /tasks/:id: Update a specific task by ID
router.put('/:id', validateTask, checkTaskExistence, (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

// PATCH /tasks/:id: Partially update a task's status
router.patch('/:id', checkTaskExistence, (req, res) => {
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    tasks[taskIndex].status = status;
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id: Delete a task by ID
router.delete('/:id', checkTaskExistence, (req, res) => {
    let tasks = readTasks();
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    writeTasks(tasks);
    res.status(204).send();
});

module.exports = router;
