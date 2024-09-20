const Task = require('../models/Task');
const { parseCSV, exportToCSV } = require('../utils/csvHelper');

// CSV Import
const importTasks = async (req, res) => {
    try {
        const tasks = await parseCSV(req.file.path);
        const errorLog = [];

        const taskPromises = tasks.map(async ({ title, description, dueDate, priority, status }) => {
            if (!title || !dueDate || !priority) {
                errorLog.push({ row: { title, description, dueDate, priority, status }, error: 'Missing required fields' });
                return;
            }
            // Check for duplicate task
            if (await Task.exists({ title })) {
                errorLog.push({ row: { title, description, dueDate, priority, status }, error: 'Duplicate task' });
                return;
            }
            // Create task and handle errors
            try {
                await Task.create({ title, description, dueDate, priority, status });
            } catch (error) {
                errorLog.push({ row: { title, description, dueDate, priority, status }, error: 'Failed to create task', details: error.message });
            }
        });
        // Wait for all promises to resolve
        await Promise.all(taskPromises);

        res.status(200).json({ 
            message: errorLog.length === 0 ? 'All tasks imported successfully' : 'Some tasks were not imported due to errors', 
            errorLog 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'CSV import failed', details: err.message });
    }
};

// CSV Export
const exportTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        const csv = exportToCSV(tasks);

        res.header('Content-Type', 'text/csv');
        res.attachment('tasks.csv');
        res.send(csv);
    } catch (err) {
        res.status(500).json({ error: 'CSV export failed' });
    }
};

module.exports = {
    importTasks,
    exportTasks
}