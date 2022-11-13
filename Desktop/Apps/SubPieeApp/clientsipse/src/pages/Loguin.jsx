import React, {  useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


import InputGroup from 'react-bootstrap/InputGroup';



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate()

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3001/api/auth/login', {email, password}).then(user=>{
    localStorage.setItem('token', user.data.token)
    sessionStorage.setItem('usuario', JSON.stringify(user.data.data)  )
    navigate('/home')
    window.location.reload()
    })
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){  navigate('/home')}

  })


  return (
    <>
      <div className="container-fluid mt-1">
        <div className="Login " >
          {/* <h1 className="display-4 text-muted  mb-4 " style={{textAlign:"center", fontFamily:'Arial', fontSize:'80px', fontWeight:'290px', color:'#1976D2'}}  >DistriData</h1> */}
          <Form
            className="mt-4 shadow-xl p-3 mb-5 mt-5 bg-body rounded border border-success p-2 mb-2 border-opacity-25" 
            onSubmit={handleSubmit}
          >
          <div className=" text-center shadow p-2 mb-5 bg-body rounded ">
            <img src="/img/logomain.png"  className="img-fluid rounded-3  "  width='200' height='200' alt="..."/>
            <div className=" text-center texto"  ><b>
              sistema de información para la planeación, seguimiento y evaluación estratégica
            </b>
              
            </div>
          </div>
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
                placeholder="email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                placeholder="password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <br />
            <div className="d-grid gap-2">
              <Button
                className="btn btn-primary"
                size="md"
                type="submit"
                disabled={!validateForm()}
              >
                Ingresar
              </Button>
            </div>
          </Form>
          <div className=" text-center">
              <img src="https://www.medellin.gov.co/es/wp-content/themes/theme_alcaldia/logos/logo_nav_footer.png"
               className="img-fluid" width='150' height='150' alt="..."/>
          </div>
        </div>
      </div>
    </>
  );
}