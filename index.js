const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

//database connection
mongoose.connect('mongodb://localhost:27017/task_manage');

//routes
app.use('/api/tasks', taskRoutes);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
