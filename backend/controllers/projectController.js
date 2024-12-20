const ProjectDAO = require('../daos/projectDao');
const { validateProjectData } = require('../helpers/validationHelper');

const addProject = async (req, res) => {
    try {
        validateProjectData(req.body);
        const project = await ProjectDAO.addProject(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await ProjectDAO.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await ProjectDAO.updateProject(req.params.id, req.body);
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        await ProjectDAO.deleteProject(req.params.id);
        res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addProject, getProjects, updateProject, deleteProject };
