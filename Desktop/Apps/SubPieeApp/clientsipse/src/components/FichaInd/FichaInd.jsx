import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './FichaInd.css'

function FichaInd() {
  return (
    <div>
    {/* información general */}
      <Form>
        <fieldset className='fieldset1 mb-3'>
          <legend className='legend1'> Información general</legend>
          <hr />
          <div className='container mt-4'>
           
            <Row>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col sm={2}> 
                  <Form.Label >Nombre Indicador</Form.Label>
                </Col>
                <Col sm={10}> 
                  <Form.Control type="text"  size='sm' placeholder="Nombre del Indicador" disabled />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col sm={2}> 
                  <Form.Label >Área tématica</Form.Label>
                </Col>
                <Col sm={10}> 
                  <Form.Control type="text"  size='sm' placeholder="Área tématica" disabled />
                </Col>
                <Col sm={2}> 
                  <Form.Label className='mt-2' >Definición del indicador</Form.Label>
                </Col>
                <Col sm={10}> 
                <Form.Control as="textarea" placeholder="Definición del indicador" rows={8} disabled className='mt-2'/>
                </Col>
                <Col sm={2}> 
                  <Form.Label className='mt-2 ' >Objetivo del indicador</Form.Label>
                </Col>
                <Col sm={10}> 
                <Form.Control as="textarea" placeholder="Objetivo del indicador" rows={8} disabled className='mt-2'/>
                </Col>
                <Col sm={2}> 
                  <Form.Label className='mt-2 ' >Marco Normativo</Form.Label>
                </Col>
                <Col sm={10}> 
                <Form.Control as="textarea" placeholder="Marco Normativo" rows={8} disabled className='mt-2'/>
                </Col>
              </Form.Group>
            </Row>
          </div>
        </fieldset>
      </Form>
    {/* estructura indicador */}
      <Form>
        <fieldset className='fieldset2 mb-3'>
        <legend className='legend1'> Estructura Indicador</legend>
        <hr />
          <div className='container mt-4'>
            <Row>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col xs={12} sm={12} md={8} lg={8} xl={4}> 
                    <Form.Label >Comportamiento deseado</Form.Label>
                    <Form.Control type="text"  size='sm' placeholder="Comportamiento" disabled />
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} xl={4}> 
                <Form.Label >Comportamiento deseado</Form.Label>
                    <Form.Control type="text"  size='sm' placeholder="Comportamiento" disabled />
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} xl={4}> 
                <Form.Label >Tipo Indicador</Form.Label>
                    <Form.Control type="text"  size='sm' placeholder="Tipo indicador" disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 mt-1" controlId="formHorizontalEmail">
                
                <Col sm={2}> 
                  <Form.Label >Fórmula de Cálculo</Form.Label>
                </Col>
                <Col sm={10}> 
                <Form.Control as="textarea" placeholder="Fórmula" rows={8} disabled className='mt-2'/>
                </Col>
                <Col sm={2}> 
                  <Form.Label className='mt-2' >Variables que componen la fórmula</Form.Label>
                </Col>
                <Col sm={10}> 
              
                <Form.Control as="textarea" placeholder="Variables" rows={8} disabled className='mt-2'/>
                </Col>
                <Col sm={2}> 
                  <Form.Label className='mt-2 ' >Fuente</Form.Label>
                </Col>
                <Col sm={10}> 
                <Form.Control as="textarea" placeholder="Fuente" rows={8} disabled className='mt-2'/>
                </Col>
              
              </Form.Group>
            </Row>
          </div>
        </fieldset>
      </Form>

   {/* sintaxis */}
      <Form>
        <fieldset className='fieldset3 mb-3'>
        <legend className='legend1'> Sintáxis</legend>
        <hr />
          <div className='container mt-4'>
            <Row>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col xs={12} sm={12} md={12} lg={6} xl={6}> 
                    <Form.Label >Sistema Informático del cálculo</Form.Label>
                    <Form.Control as="textarea" placeholder="Sistema" rows={4} disabled className='mt-2'/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}> 
                <Form.Label >Sintaxis</Form.Label>
                <Form.Control as="textarea" placeholder="Sintáxis" rows={4} disabled className='mt-2'/>
                </Col>
              </Form.Group>
            </Row>
          </div>
        </fieldset>
      </Form>

   {/* Seguimiento */}
      <Form>
        <fieldset className='fieldset4 mb-3'>
        <legend className='legend1'> Seguimiento</legend>
        <hr />
          <div className='container mt-4'>
            
            <Row>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col xs={12} sm={12} md={12} lg={6} xl={6}> 
                    <Form.Label >Periocidad del cálculo</Form.Label>
                    <Form.Control type="text"  size='sm' placeholder="Comportamiento" disabled />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}> 
                <Form.Label >Fecha/Periodo de actualización</Form.Label>
                    <Form.Control type="text"  size='sm' placeholder="Comportamiento" disabled />
                </Col>
               
              </Form.Group>

       
            </Row>

          </div>
      

      
        </fieldset>
      </Form>

 {/* Responsables */}
      <Form>
        <fieldset className='fieldset5 mb-3'>
        <legend className='legend1'> Responsables</legend>
        <hr />
          <div className='container mt-4'>
            <Row>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col sm={3}> 
                  <Form.Label >Nombre dependencia responsable del reporte</Form.Label>
                </Col>
                <Col sm={9}> 
                  <Form.Control type="text"  size='sm' placeholder="Dep. Responsable reporte" disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col sm={3}> 
                  <Form.Label >Unidad responsable del reporte</Form.Label>
                </Col>
                <Col sm={9}> 
                  <Form.Control type="text"  size='sm' placeholder="Unidad responsable del reporte" disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col sm={3}> 
                  <Form.Label >Nombre dependencia responsable (misional) </Form.Label>
                </Col>
                <Col sm={9}> 
                  <Form.Control type="text"  size='sm' placeholder="Nombre dependencia responsable del reporte" disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col sm={3}> 
                  <Form.Label >Obervaciones</Form.Label>
                </Col>
                <Col sm={9}> 
                <Form.Control as="textarea" placeholder="Observaciones del indicador" rows={8} disabled className='mt-2'/>
                </Col>
              </Form.Group>
            </Row>
          </div>
        </fieldset>
      </Form>
    </div>
  )
}

export default FichaInd;