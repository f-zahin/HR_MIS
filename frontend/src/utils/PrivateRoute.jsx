import React from 'react'
import { Navigate } from 'react-router-dom';
import { userAuth } from '../context/authContext';

const PrivateRoute = ({children}) => {
    const {user,Loading} =userAuth()
  
    if(Loading){
        return <div>Loading...</div>
    }
    return user?children:<Navigate to="/login"/>}

export default PrivateRoute
