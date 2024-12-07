import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../redux/reducers/userSlice'

const AddNewUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        city: '',
    })
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('email', input.email);
        formData.append('password', input.password);
        formData.append('gender', input.gender);
        formData.append('city', input.city);
        formData.append('profile', file);

        const token = localStorage.getItem('adminToken');
        if (!token) {
            alert('Please login as admin first');
            navigate('/adminLogin');
            return;
        }

        try {
            const response = await fetch('http://localhost:9000/api/v1/admin/addUser', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert(data.message);
                dispatch(getAllUsers());
                navigate('/adminDashboard');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user');
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Add New User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            placeholder="Full Name"
                            value={input.name}
                            onChange={(e) => setInput({ ...input, name: e.target.value })}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="Email Address"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="Password"
                            value={input.password}
                            onChange={(e) => setInput({ ...input, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <select
                            id="gender"
                            name="gender"
                            className="form-input"
                            value={input.gender}
                            onChange={(e) => setInput({ ...input, gender: e.target.value })}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="form-input"
                            placeholder="City"
                            value={input.city}
                            onChange={(e) => setInput({ ...input, city: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="file"
                            id="profile"
                            name="profile"
                            className="form-input"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <button type="submit" className="auth-button">Add User</button>
                </form>
            </div>
        </div>
    )
}

export default AddNewUser