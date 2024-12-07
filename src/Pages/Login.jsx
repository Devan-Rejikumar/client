import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { storeTokens } from '../utils/auth';
import '../styles/theme.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const response = await loginUser(formData.email, formData.password);
            
            if (response.accessToken && response.refreshToken) {
                const stored = storeTokens(response.accessToken, response.refreshToken);
                if (!stored) {
                    throw new Error('Failed to store authentication tokens');
                }
            } else {
                throw new Error('Invalid response from server');
            }

            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
            }

            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="hello@example.co"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
                <div className="auth-footer">
                    <Link to="/forgot-password" className="auth-link">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;