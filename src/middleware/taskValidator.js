const validateTask = (req, res, next) => {
    const { name, status } = req.body;
    if (!name || !status) {
        return res.status(400).json({ error: 'Task name and status are required' });
    }
    next();
};

module.exports = validateTask;
