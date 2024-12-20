import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTokens } from '../../utils/auth'

// Get All Users
export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const adminToken = localStorage.getItem('adminToken');
        const { accessToken } = getTokens();
        const token = adminToken || accessToken;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch('http://localhost:9000/api/v1/admin/users', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Server Error');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching users:', error);
        return rejectWithValue(error.message);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default userSlice.reducer