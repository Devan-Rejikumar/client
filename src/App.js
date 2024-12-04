import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Components/Register';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { getTokens } from './utils/auth';

function App() {
    const { accessToken } = getTokens();

    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    accessToken ? <Navigate to="/dashboard" replace /> : <Login />
                } />
                <Route path="/register" element={
                    accessToken ? <Navigate to="/dashboard" replace /> : <Register />
                } />


                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />


                <Route path="/" element={
                    accessToken ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
                } />
            </Routes>
        </Router>
    );
}

export default App;