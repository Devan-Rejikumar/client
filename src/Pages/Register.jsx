import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../redux/reducers/userSlice'
import '../styles/theme.css';

const Register = () => {
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
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('email', input.email)
    formData.append('password', input.password)
    formData.append('gender', input.gender)
    formData.append('city', input.city)
    formData.append('profile', file)

    try {
      const res = await fetch('http://localhost:9000/api/v1/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok) {
        alert(data.message)
        dispatch(getAllUsers())
        navigate('/login')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error during registration:', error)
      alert('An error occurred during registration')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
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
              placeholder="hello@example.co"
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
              placeholder="••••••••"
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
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
              accept="image/*"
            />
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
        <div className="auth-footer">
          <Link to="/login" className="auth-link">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
