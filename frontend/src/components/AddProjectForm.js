import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  updateProject,
  resetMessage,
} from "../store/projectSlice";

const AddProjectForm = ({ onClose }) => {
  const { projects, selectedProjectId } = useSelector((state) => state.projects);
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    deadline: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  // Set form data if editing
  useEffect(() => {
    if (selectedProjectId) {
      const project = projects.find((p) => p._id === selectedProjectId);
      setFormData({ 
        name: project.name, 
        client: project.client, 
        deadline: formatDate(project.deadline) 
      });
    }
  }, [selectedProjectId, projects]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for current field
    if (value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } 
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Project Name is required';
    if (!formData.client.trim()) newErrors.client = 'Client Name is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    return newErrors;
  };

  // Check if the form is valid (no errors and all fields filled)
  const isFormValid = () => {
    const validationErrors = validateForm();
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (selectedProjectId) {
      dispatch(updateProject({ id: selectedProjectId, data: formData }));
    } else {
      dispatch(createProject(formData));
    }

    setFormData({ name: "", client: "", deadline: "" });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-2xl font-bold text-center mb-4">
        {selectedProjectId ? "Update Project" : "Add New Project"}
      </h2>

      {/* Project Name */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Project Name"
        className={`w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 
          ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

      {/* Client Name */}
      <input
        type="text"
        name="client"
        value={formData.client}
        onChange={handleChange}
        placeholder="Client Name"
        className={`w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 
          ${errors.client ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.client && <p className="text-red-500 text-sm mb-4">{errors.client}</p>}

      {/* Deadline */}
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className={`w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 
          ${errors.deadline ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.deadline && <p className="text-red-500 text-sm mb-4">{errors.deadline}</p>}

      <button
        type="submit"
        className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all 
          ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isFormValid()}
      >
        {selectedProjectId ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default AddProjectForm;
