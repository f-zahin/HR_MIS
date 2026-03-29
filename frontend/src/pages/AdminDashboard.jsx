import React from 'react'
import { userAuth } from '../context/authContext';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminDashboard/AdminSidebar';
import Navbar from '../components/AdminDashboard/Navbar';

const AdminDashboard = () => {
  const navigate =useNavigate();
  const {user,loading} =userAuth();
  
  if(loading){
    return <div>Loading...</div>
  }
  if(!user){
    navigate('/login')
  }

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />
         <Outlet/>
      </div>
      
    </div>
    
  );
}

export default AdminDashboard;
