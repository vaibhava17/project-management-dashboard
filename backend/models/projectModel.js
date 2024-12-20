const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    client: { type: String, required: true },
    deadline: { type: Date, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
