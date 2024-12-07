import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/theme.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login')
            return
        }
        setUser(JSON.parse(userData));
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    const getProfileUrl = (profile) => {
        if (!profile) return 'https://via.placeholder.com/150';
        return `http://localhost:9000/public/${profile}`;
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <div className="header-content">
                        <h1>User Dashboard</h1>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                </div>
                
                {user && (
                    <div className="user-profile-container">
                        <div className="profile-header">
                            <div className="profile-image-container">
                                <img
                                    src={getProfileUrl(user.profile)}
                                    alt="Profile"
                                    className="profile-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                            </div>
                            <div className="profile-info">
                                <h2 className="user-name">{user.name}</h2>
                                <p className="user-role">{user.role || 'User'}</p>
                            </div>
                        </div>
                        
                        <div className="user-details">
                            <div className="detail-item">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">{user.email}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Gender:</span>
                                <span className="detail-value">{user.gender}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">City:</span>
                                <span className="detail-value">{user.city}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;