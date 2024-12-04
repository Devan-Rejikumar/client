import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../redux/reducers/userSlice'

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
      console.log('Attempting to submit form with data:', {
        name: input.name,
        email: input.email,
        gender: input.gender,
        city: input.city,
        fileSelected: file ? 'yes' : 'no'
      })

      const res = await fetch('http://localhost:9000/api/v1/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
        credentials: 'include'
      })

      console.log('Response status:', res.status)
      const data = await res.json()
      console.log('Server response:', data)

      if (res.ok) {
        alert(data.message)
        setInput({
          name: '',
          email: '',
          password: '',
          gender: '',
          city: '',
        })
        setFile(null)
        dispatch(getAllUsers())
        navigate('/')
      } else {
        throw new Error(data.message || 'Failed to register user')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert(error.message || 'Error submitting form. Please check if the server is running.')
    }
  }

  return (
    <div className='container mt-4'>
      <div className='bg-primary text-white p-2 mb-4'>
        <h2 className='text-center m-0'>Add New User</h2>
      </div>
      <form onSubmit={handleSubmit} className='mx-auto' style={{ maxWidth: '600px' }}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter Name'
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter Email'
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter Password'
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Gender</label>
          <div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='gender'
                value='Male'
                checked={input.gender === 'Male'}
                onChange={(e) => setInput({ ...input, gender: e.target.value })}
                required
              />
              <label className='form-check-label'>Male</label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='gender'
                value='Female'
                checked={input.gender === 'Female'}
                onChange={(e) => setInput({ ...input, gender: e.target.value })}
              />
              <label className='form-check-label'>Female</label>
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>City</label>
          <select
            className='form-select'
            name='city'
            value={input.city}
            onChange={(e) => setInput({ ...input, city: e.target.value })}
            required
          >
            <option value=''>Select City</option>
            <option value='Botad'>Botad</option>
            <option value='Ahmedabad'>Ahmedabad</option>
            <option value='Surat'>Surat</option>
            <option value='Vadodara'>Vadodara</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='form-label'>Profile</label>
          <input
            type='file'
            name='profile'
            className='form-control'
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className='d-flex gap-2'>
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to='/' className='btn btn-danger text-decoration-none'>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
