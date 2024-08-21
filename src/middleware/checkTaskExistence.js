const { readTasks } = require('../utils/fileOperations');

const checkTaskExistence = (req, res, next) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    req.task = task;
    next();
};

module.exports = checkTaskExistence;
