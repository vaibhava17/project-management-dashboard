const API_URL = 'http://localhost:5001/api/projects/';

// Create a new project
const createProject = async (projectData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer hardcoded-token'
        },
        body: JSON.stringify(projectData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to create project');
    }
    return data;
};

// Get all projects
const getProjects = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer hardcoded-token'
        }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch projects');
    }
    return data;
};

// Update a project
const updateProject = async (projectId, updatedData) => {
    const response = await fetch(`${API_URL}${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer hardcoded-token'
        },
        body: JSON.stringify(updatedData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to update project');
    }
    return data;
};

// Delete a project
const deleteProject = async (projectId) => {
    const response = await fetch(`${API_URL}${projectId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer hardcoded-token'
        }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to delete project');
    }
    return data;
};

const projectService = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
};

export default projectService;
