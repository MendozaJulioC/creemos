import React from 'react'
import { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'

import { FcAbout, FcSearch }from "react-icons/fc";

import ChartDualAxis from '../components/Charts/ChartDualAxis';
import FichaInd from '../components/FichaInd/FichaInd';

function FichaMain() {
  let navigate = useNavigate()
  useEffect(()=>{const token = localStorage.getItem('token') ; if(!token){  navigate('/login')}})

  return (
    <div>
      <div className="container mt-1  ">
        <div
          id="carouselExampleDark"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="5000">
              <img
                src="/img/banner1.png"
                height={300}
                width={300}
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
        </div>
        <div className="d-grid gap-3 ">
          <Navbar bg="success" variant="ligth">
            <Container>
            <FcAbout size={'3%'} />
              <Navbar.Brand href="#home"></Navbar.Brand>
              <Navbar.Brand href="#home">Ficha Metodológica Indicador</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <div className="p-1">
            <Row>
              <Col xs={12} sm={12} md={8} lg={8} xl={10}>
                <Form.Select>
                  <option>Default select</option>
                  <option>Default select</option>
                  <option>Default select</option>
                  <option>Default select</option>
                  <option>Default select</option>
                  <option>Default select</option>
                </Form.Select>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} xl={2}>
                <div className="d-grid gap-2">
                <Button className="btn btn-warning" size="md" type="submit">
                    <FcSearch />
                    Consultar
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <section className=" mt-3 shadow p-3 mb-2 bg-body rounded-2 fondo ">
                  <div className='container'>
                     <Card.Body className="text-center  text-muted">
                  {/* <ChartBar/> */}
                    <ChartDualAxis />
                  </Card.Body>
                  </div>
                 
                </section>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <section className=" mt-3 shadow p-1 mb-1 bg-body rounded-4 fondo ">
                  <div className="container">

                    <Card.Title className='mb-2 mt-4'>
                      <span className='legend1 '> 
                        Comportamiento del Indicador  
                      </span>
                     
                    </Card.Title>
                    <small class="text-muted  legendtablesubtitle">colocar aquí el nombre del Indicador</small>
                  </div>
                  
                  <Card.Body className="text-center  text-muted">
                    <table className="table table-striped table-hover table-sm">   
                      <thead>
                        <tr style={{color: '#8E2DE2'}}>
                          <th scope="col">#</th>
                          <th scope="col">First</th>
                          <th scope="col">Last</th>
                          <th scope="col">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>1</td>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                        <td>1</td>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                        <tr>
                        <td>1</td>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                        <tr>
                        <td>1</td>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                        <tr>
                        <td>1</td>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>

                      </tbody>
                    </table>
                  </Card.Body>
                </section>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <section className=" mt-3 shadow p-3 mb-4 bg-body rounded-4 fondo">
                  <div className='container'>
                    <Card.Body className=" text-muted">
                      <Card.Title className='legenda mb-4 '><center>Ficha Técnica del Indicador  </center></Card.Title>
                      <FichaInd />
                    </Card.Body>
                  </div>
            
                </section>
              </Col>
           
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FichaMain