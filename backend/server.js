const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Task } = require('./db'); // Import the database setup

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
    const { title, isFav, date } = req.body; // title -> description, isFav -> statu
    try {
        const newTask = await Task.create({
            description: title, // Mapping frontend 'title' to 'description'
            statu: isFav ? 1 : 0, // Mapping 'isFav' to 'statu', 1 for true, 0 for false
            date
        });

        // Fetch all tasks after creating the new one
        const tasks = await Task.findAll();
        res.status(201).json(tasks);  // Return the updated list of tasks
    } catch (err) {
        res.status(400).json({ message: 'Error creating task', error: err });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const { title, isFav, date } = req.body; // title -> description, isFav -> statu
    const task = await Task.findByPk(req.params.id);
    if (task) {
        task.description = title; // Mapping 'title' to 'description'
        task.statu = isFav ? 1 : 0; // Mapping 'isFav' to 'statu'
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
        await task.destroy();  // Delete the task from the database
        res.status(204).send();  // Respond with no content on successful deletion
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
