import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { getTokens } from './utils/auth';
import AdminLogin from './Pages/AdminLogin';
import Home from './Pages/Home';
import AdminDashboard from './Pages/AdminDashboard';
import AddNewUser from './Pages/AddNewUser';
const App = () => {
    const { accessToken } = getTokens();

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={accessToken ? <Navigate to="/dashboard" replace /> : <Login />}
                />
                <Route
                    path="/register"
                    element={accessToken ? <Navigate to="/dashboard" replace /> : <Register />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/"
                    element={accessToken ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
                />
                <Route path="/adminLogin" element={<AdminLogin />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/adminDashboard"
                    element={
                        localStorage.getItem('adminToken') ?
                            <AdminDashboard /> :
                            <Navigate to="/adminLogin" replace />
                    }
                />
                <Route
                    path="/admin/adduser"
                    element={
                        localStorage.getItem('adminToken') ?
                            <AddNewUser /> :
                            <Navigate to="/adminLogin" replace />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;