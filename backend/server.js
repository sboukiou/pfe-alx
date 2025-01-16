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
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

// Get a task by ID
app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        await task.destroy();  // Delete the task from the database
        res.status(204).send();  // Respond with no content on successful deletion
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    const { title, isFav, date } = req.body;
    try {
        // Ensure you're using 'title' as the field in the database
        const newTask = await Task.create({
            title: title,    // Use 'title' here instead of 'description'
            isFav: isFav,    // Optional: include 'isFav' if you want to track favorites
            date: date,      // Ensure you're sending a valid date from the frontend
        });
        res.status(201).json(newTask);  // Send the full task object (including 'id') as response
    } catch (err) {
        res.status(400).json({ message: 'Error creating task', error: err });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const { title, isFav, date } = req.body; // These fields should match your frontend model
    const task = await Task.findByPk(req.params.id);

    if (task) {
        // Update the task fields
        task.title = title;  // Mapping 'title' from the frontend
        task.isFav = isFav;  // Mapping 'isFav' (favorite) from the frontend
        task.date = date;    // Update the date (if necessary)

        await task.save();   // Save changes to the database

        // Respond with the updated task
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
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
