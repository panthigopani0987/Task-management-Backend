const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    duedate: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
    }
});

module.exports = mongoose.model('Task', taskSchema);