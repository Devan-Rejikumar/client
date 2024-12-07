import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../redux/reducers/userSlice'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    console.log('Admin Token:', adminToken);
    dispatch(getAllUsers())
  }, [dispatch])

  const {users} = useSelector((state) => state.users)
  console.log('Users from Redux:', users);
  return (
    <div className='container'>
      <h1 className='text-center bg-primary text-white p-2'>User Management System</h1>
      <Link to='/register' className='btn btn-primary mb-2'>
        <i className='bi bi-house'></i> Add Users
      </Link>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>City</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user)=>{
            return  (
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
              </tr>
            ) 
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home