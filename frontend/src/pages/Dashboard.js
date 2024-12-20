import React, { useState } from 'react';
import ProjectTable from '../components/ProjectTable';
import AddProjectForm from '../components/AddProjectForm';
import { useDispatch } from 'react-redux';
import { selectProject, deleteProject } from '../store/projectSlice';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState(null);
    const dispatch = useDispatch();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEditProject = (projectId) => {
        dispatch(selectProject(projectId));
        openModal();
    };

    const handleDeleteRequest = (projectId) => {
        setDeleteProjectId(projectId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteProject(deleteProjectId));
        setIsDeleteModalOpen(false);
        setDeleteProjectId(null);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteProjectId(null);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Project Management Dashboard</h1>
            
            <button 
                onClick={openModal} 
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
                Add New Project
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-11/12 md:w-1/2 p-8 rounded-lg shadow-lg relative">
                        
                        <button 
                            onClick={closeModal} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <AddProjectForm onClose={closeModal} />
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-96 p-8 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold text-center mb-4">Are you sure?</h2>
                        <p className="text-center mb-6">Do you really want to delete this project? This process cannot be undone.</p>
                        <div className="flex justify-around">
                            <button 
                                onClick={handleDeleteConfirm} 
                                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button 
                                onClick={closeDeleteModal} 
                                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ProjectTable onEditProject={handleEditProject} onDeleteRequest={handleDeleteRequest} />
        </div>
    );
};

export default Dashboard;
