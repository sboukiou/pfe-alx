const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Task } = require('./db');
const app = express();
const PORT = 3000;
const helmet = require('helmet');
app.use(cors());
app.use(bodyParser.json());

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                fontSrc: ["'self'", "http://localhost:3000"],
            },
        },
    })
);

// Sync database
sequelize.sync().then(() => {
    console.log('Database synced');
});

// Routes

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
    res.send('t!');
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

// Get a task by ID
app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    const { description, statu, date } = req.body;

    // Validate that all required fields are present
    if (!description || !statu || !date) {
        return res.status(400).json({ message: 'All fields (description, statu, date) are required.' });
    }

    try {
        // Create the new task
        const newTask = await Task.create({
            description,
            statu,
            date
        });

        // Return the newly created task with id
        res.status(201).json(newTask);
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ message: 'Error creating task', error: err.message });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const { title, isFav, date } = req.body; 
    const task = await Task.findByPk(req.params.id);
    if (task) {
        task.description = title;
        task.statu = isFav ? 1 : 0;
        task.date = date;
        await task.save();
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        await task.destroy();
        res.status(204).send();  // Respond with no content on successful deletion
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});
// Delete all tasks from tasks.db
app.delete('/tasks', async (req, res) => {
    try {
        const result = await Task.destroy({ where: {} });  // Deletes all tasks
        res.status(204).send();  // Send no content if successful
    } catch (error) {
        console.error("Error deleting all tasks:", error);
        res.status(500).json({ message: "Error deleting tasks" });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
