
import { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate()
  useEffect(()=>{const token = localStorage.getItem('token') ; if(!token){  navigate('/login')}})
  return (
    <div className='container'><h1> Dashboard </h1> </div>
  )
}

export default Dashboard