import { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import CardSubMain from '../components/CardSubMain/Cardsubmain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FcMindMap, FcSearch, FcInTransit, FcCollect, FcDeployment, FcFactory , FcCalculator, FcBusinessman,
        FcCurrencyExchange, FcCustomerSupport, FcMultipleDevices, FcScatterPlot, FcWikipedia
      } 
from "react-icons/fc";


function Economia() {
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
          <Navbar bg="info" variant="ligth">
            <Container>
              <Navbar.Brand href="#home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  className="bi bi-cash-stack"
                  viewBox="0 0 16 16"
                >
                  <g fill="#628886">
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                  </g>
                </svg>
              </Navbar.Brand>
              <Navbar.Brand href="#home">Ecomomía</Navbar.Brand>
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
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcMindMap size="10%" />}
                  title="Comercio Internacional"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcCollect size="10%" />}
                  title="Comercio Interno"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcDeployment size="10%" color="white" />}
                  title="Construcción"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcCalculator size="10%" color="white" />}
                  title="Cuentas nacionales"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcFactory size="10%" />}
                  title="Industria"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcBusinessman size="10%" color="white" />}
                  title="Mercado Laboral"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcCurrencyExchange size="10%" />}
                  title="Precios y costos"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcCustomerSupport size="10%" />}
                  title="Servicios"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcMultipleDevices size="10%" />}
                  title="Tecnología e innovación"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <CardSubMain
                  ico={<FcInTransit size="10%" color="white" />}
                  title="Transporte"
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={3}>
                <CardSubMain
                  ico={<FcScatterPlot size="10%" color="white" />}
                  title="Aspectos de interes..."
                  urlgo="/subcategoria/economia"
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={3}>


              <CardSubMain
                  ico={<FcWikipedia size="10%" color="white" />}
                  title="Documentación..."
                  urlgo="/subcategoria/economia"
                />
              </Col>
             
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Economia























