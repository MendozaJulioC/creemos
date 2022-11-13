import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard';
import Dependencias from '../pages/Dependencias';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Loguin from '../pages/Loguin';
import Register from '../pages/Register'
import FichaMain from  '../pages/FichaMain'
import { useEffect, useState } from 'react';
import Navigation from '../components/NavBarMain/Navigation';
import Economia from '../pages/Economia';


function Ruta() {
  const [usuario, setUsuario ]= useState({});
  useEffect(()=>{
    let getSession = sessionStorage.getItem('usuario')
    const activo= JSON.parse(getSession);
    if(activo){
        setUsuario({
          cod_dependencia: activo[0].cod_dependencia,
          email:  activo[0].email,
          id:  activo[0].id,
          id_cargo:  activo[0].id_cargo,
          id_user_num:  activo[0].id_user_num,
          nom_usuario:  activo[0].nom_usuario,
          rol_user:  activo[0].rol_user,
          tel_contacto:  activo[0].tel_contacto 
        })

    }else{
      localStorage.clear(); 
      sessionStorage.clear(); 
    }
  
  }, [])


  return (
    <BrowserRouter>
      <Navigation user={usuario}/>
        <Routes>
          <Route index element ={<Loguin/>}/>
          <Route path='/landing' element ={<Landing/>}/>
          <Route path='/login' element ={<Loguin/>}/>
          <Route path='/home' element={<Home/>}/>     
          <Route path='/dashboard' element = {<Dashboard />}/>
          <Route path='/dependencias' element = {<Dependencias />}/>
          <Route path='/register' element ={<Register />}/>
          <Route path='/logout' element ={<Loguin />}/>
          <Route path='/subcategoria/economia' element ={<Economia />}/>
          <Route path='/ficha' element ={<FichaMain />}/>
          <Route path='*' element={<Landing/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Ruta