import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : 'auth',
    initialState :{
        isAuthenticated : false,
        user : null, 
        error : null
    },
    reducers:{
        loginSuccess : (state, action) =>{
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null; 
        },
        logout : (state) =>{
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        }
    }
})
export const {loginSuccess, loginFail, logout} = authSlice.actions;
export default authSlice.reducer;