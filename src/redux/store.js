import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import authReducer from './reducers/authSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        auth : authReducer
    }
})

export default store