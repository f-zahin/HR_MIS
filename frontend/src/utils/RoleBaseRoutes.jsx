import React from 'react'
import { userAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom';
const RoleBaseRoutes = ({children,requiredRole}) => {
  const {user,loading}=userAuth()

  if(loading){
    return <div>Loadding...</div>
  }
  if(!requiredRole.includes(user.role)){
    <Navigate to="/unathurized"/>
  }
  
  return user?children:<Navigate to="/login"/>
}

export default RoleBaseRoutes
