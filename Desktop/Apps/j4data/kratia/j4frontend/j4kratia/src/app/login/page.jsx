// < / >
"use client"
import  React,{ useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'next/image'
import axios from "axios";
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
    
import Router, { useRouter } from 'next/navigation'
import { useKeys } from "../context/CtxLogin";

export default function Login() {
  const router = useRouter()
  const {createCredenciales}= useKeys()

  useEffect(()=>{const session = sessionStorage.getItem('UserCook') ;  if(session){  redirect('/dash')}})

  const [credentials, setCredentials]= useState({
      email: '',
      password: ''
  })
  const [alerta, setAlerta] = useState(false);
  const permiso=[];

  const handleChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name]: [e.target.value]
      })
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
      event.preventDefault();
      event.stopPropagation();
 
      setValidated(true);

      const response = await axios.post('/api/auth/', credentials)
      setAlerta(false);

      if (response.data.usuario.length > 0) {
        permiso.push({
          success:response.data.usuario[0].success,
          nombre: response.data.usuario[0].nombre, 
          cedula: response.data.usuario[0].cedula,
          email:   response.data.usuario[0].email,
          rol: response.data.usuario[0].rol
  
         })
   
        createCredenciales(
          response.data.usuario[0].success,
          response.data.usuario[0].nombre, 
          response.data.usuario[0].cedula,
          response.data.usuario[0].email, 
          response.data.usuario[0].rol,
          response.data.usuario[0].token 
        )
        sessionStorage.setItem('UserCook', JSON.stringify(response.data.usuario[0].token));
        localStorage.setItem('User', JSON.stringify(permiso))

      router.push ('/dash')

      } 
      if (response.data.usuario.length == '') {
        console.log('datos Errados')
        setAlerta(true);
      }
  };

  return (
    <>
   
   <div className='container mt-4 py-4'>
        <div className="Login mt-3 py-3">
          <Form
            className="mt-4 shadow-xl p-3 mb-5 mt-5 bg-body rounded border border-success p-2 mb-2 border-opacity-25"
            noValidate validated= {validated } onSubmit={handleSubmit}
          >
          <div className=" text-center shadow p-2 mb-5 bg-body rounded ">
            <Image
              src="/j4data.png"
              alt="Next.js Logo"
              width={200}
              height={200}
              priority
            />
          </div>
          <h1 className="display-4 text-muted  mb-4 " style={{textAlign:"center",  fontSize:'18px', fontWeight:'9px', color:'#1976D2'  }}  >
            Bienvenidos al portal de análisis e inteligencia politíca de Medellín
          </h1> 
          <InputGroup className="mb-3 mt-3">
              <InputGroup.Text id="basic-addon1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#5499C7"
                  className="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                name="email"
                placeholder="email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                autoFocus
                required
                type="email"
                /**   value={email} */
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Por favor validar tu email registrado.</Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#5499C7"
                  className="bi bi-key-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                name="password"
                required
                placeholder="password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                type="password"
            /* value={password} */
               onChange={handleChange}
              />
              {alerta ?  <Form.Control.Feedback type="invalid">Debes escribir la contraseña!!!.</Form.Control.Feedback> : null}
                        </InputGroup>
          <br />
          <div className="d-grid gap-2">
            <Button
              size="md"
              type="submit"
              //disabled={!validateForm()}
              style={{background:'#19376D'}}
            >Ingresar
            </Button>
          </div>
          <br />
          {alerta ?
                <Alert className="shadow-lg" variant="danger" onClick={() => {setAlerta(false) ; setValidated(false);  }  } dismissible>
                    <center>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="bi bi-exclamation-triangle-fill"
                        viewBox="0 0 16 16"
                      >
                        <g fill="#DC3535">
                          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </g>
                      </svg>
                      &nbsp; Error en las credenciales!!!
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </center>
                </Alert>
                : null
              } 
          </Form>
        </div>
      </div>
    </>
  );
}

