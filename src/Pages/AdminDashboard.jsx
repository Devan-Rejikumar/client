import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/reducers/userSlice';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/adminLogin')
      return
    }
    dispatch(getAllUsers())
  }, [dispatch, navigate])

  const { users, loading, error } = useSelector((state) => state.users)

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/adminLogin')
  }

  const handleDeleteClick = (user) => {
    console.log("User to delete:", user); 
    setUserToDelete(user);
    setShowDeleteModal(true);
  };
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      console.log("Token being sent:", token); 
      
      const deleteUrl = `http://localhost:9000/api/v1/admin/deleteUser/${userToDelete._id}`;
      console.log("Delete URL:", deleteUrl); 
  
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      // ... rest of your code
  
      if (response.ok) {
        dispatch(getAllUsers());
        setShowDeleteModal(false);
        setUserToDelete(null);
      } else {
        const data = await response.json();
        alert(data.message || 'Error deleting user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting user');
    }
  };

  return (
    <div className='container'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className='text-primary'>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
  
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-danger">Error: {error}</div>}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">User Management</h5>
          <Link to='/admin/adduser' className='btn btn-primary mb-3'>
            <i className='bi bi-person-plus'></i> Add New User
          </Link>
  
          <div className="table-responsive">
            <table className='table table-striped'>
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>City</th>
                  <th>Profile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.city}</td>
                    <td>
                      <img
                        src={user.profile}
                        alt="profile"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    </td>
                    <td>
                      <button className="btn btn-sm btn-info me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteClick(user)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete {userToDelete?.name}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </div>
      )}
    </div>
  )
}
export default AdminDashboard