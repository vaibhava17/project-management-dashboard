const validateProjectData = (data) => {
    const { name, client, deadline } = data;
    if (!name || !client || !deadline) {
        throw new Error('All fields (name, client, deadline) are required');
    }
};

module.exports = { validateProjectData };
