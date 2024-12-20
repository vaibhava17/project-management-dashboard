import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from '../services/projectService';

export const getProjects = createAsyncThunk('projects/getProjects', async (_, thunkAPI) => {
    try {
        return await projectService.getProjects();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const createProject = createAsyncThunk('projects/createProject', async (data, thunkAPI) => {
    try {
        return await projectService.createProject(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, data }, thunkAPI) => {
    try {
        return await projectService.updateProject(id, data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id, thunkAPI) => {
    try {
        await projectService.deleteProject(id);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        isLoading: false,
        isError: false,
        message: '',
        selectedProjectId: null
    },
    reducers: {
        selectProject: (state, action) => {
            state.selectedProjectId = action.payload;
        },
        resetMessage: (state) => {
            state.message = '';
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Projects
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            
            // Create Project
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects.push(action.payload);
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Update Project
            .addCase(updateProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.projects.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Delete Project
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = state.projects.filter(project => project._id !== action.payload);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { selectProject, resetMessage } = projectSlice.actions;
export default projectSlice.reducer;
