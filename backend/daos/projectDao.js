const Project = require('../models/projectModel');

class ProjectDAO {
    static async addProject(data) {
        return await Project.create(data);
    }

    static async getAllProjects() {
        return await Project.find();
    }

    static async updateProject(id, data) {
        return await Project.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteProject(id) {
        return await Project.findByIdAndDelete(id);
    }
}

module.exports = ProjectDAO;
