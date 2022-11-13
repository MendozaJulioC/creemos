import { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";

function Dependencias() {
  let navigate = useNavigate()
  useEffect(()=>{const token = localStorage.getItem('token') ; if(!token){  navigate('/login')}})
  return (
    <div className='container'><h1> Dependencias </h1> </div>
  )
}

export default Dependencias