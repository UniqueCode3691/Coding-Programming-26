import React from 'react'
import { UserAuth } from "../context/AuthContext"
import { Navigate } from 'react-router-dom';
import logo from '../assets/NearMeerLogoImgOnly.png'

const PrivateRoute = ({ children }) => {
  const {session} = UserAuth();

  if (session === undefined) {
    return <img src={logo} className='w-50 mx-auto my-auto bg-mapletan' />
  }

  return <>{session ? <>{ children }</> : <Navigate to="/sign-in" />}</>
}

export default PrivateRoute