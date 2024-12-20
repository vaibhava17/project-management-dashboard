import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../store/projectSlice';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const ProjectTable = ({ onEditProject, onDeleteRequest }) => {
    const dispatch = useDispatch();
    const { projects, isLoading, isError, message } = useSelector((state) => state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    if (isLoading) {
        return <p className="text-center mt-10 text-blue-500">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center mt-10 text-red-500">Error: {message}</p>;
    }

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-center mb-4">Project List</h2>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-4 border border-gray-200">Project Name</th>
                            <th className="p-4 border border-gray-200">Client</th>
                            <th className="p-4 border border-gray-200">Deadline</th>
                            <th className="p-4 border border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id} className="bg-white hover:bg-gray-100">
                                <td className="p-4 border border-gray-200">{project.name}</td>
                                <td className="p-4 border border-gray-200">{project.client}</td>
                                <td className="p-4 border border-gray-200">{formatDate(project.deadline)}</td>
                                <td className="p-4 border border-gray-200 flex justify-around">
                                    <button 
                                        onClick={() => onEditProject(project._id)} 
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => onDeleteRequest(project._id)} 
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectTable;
