import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Navigation({user}){

    const handleShow = () => {
        //setShow(true);
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          title: 'Deseas Salir?',
          //text: "Deseas revertir esto?!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#5499C7',
          cancelButtonColor: '#19D2A8',
          confirmButtonText: 'Sí, deseo salir!',
        
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Hasta luego!!!',
              text: "Cerrando aplicación, nos vemos pronto!",
              showConfirmButton: false,
              timer: 10000,
           
            }).then(Bye())
          }
        })
    }
      return (
        <>
     
          <Navbar bg="light" variant="light" expand='lg'>
        
            <Container>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
              <Navbar.Brand href="#home">

              <img src="/img/logomain.png" className="img-fluid rounded" width='30' height='30' alt="..."/>
            
              </Navbar.Brand>
              <Navbar.Brand href="/home">SIPSE</Navbar.Brand>
              <Nav
                  className="me-auto my-2 my-lg-0 mb-2"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >
                  { user.nom_usuario ? <Nav>  <Nav.Link href="/dashboard">Dashboards</Nav.Link>
                    <Nav.Link href="/dependencias">Dependencias</Nav.Link>
                    <Nav.Link href="/dependencias">Territorios</Nav.Link>
                    <Nav.Link href="/dependencias">Estratégico</Nav.Link> 
                      <Nav.Link href="/ficha">Ficha</Nav.Link> 
                      </Nav>
                    : <p> </p> 
                    
                  
                    
                    }
  
                 
                   
                    {/* <Nav.Link href="/register">Registers</Nav.Link> */}
              </Nav>
              <Navbar.Collapse   className="justify-content-end">
                        {/* <Form.Text className="text-muted">Hola &nbsp;</Form.Text> */}
                      <Form.Text className="text-muted">{user.nom_usuario ? <p>Hola &nbsp;</p> : <p> </p> }</Form.Text> 
                      <Form.Text className="text-muted"><p> {user.nom_usuario} </p></Form.Text>
                      <Form.Text className="text-muted">   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Text>
  
                    
                      <Form className="d-flex">
                        {user.nom_usuario ? <Button variant="outline-danger" size='sm' onClick={handleShow} >Salir</Button> :
                        <Button variant="outline-danger" size='sm' onClick={handleShow} disabled >Salir</Button>}
                        {/* <Button onClick={()=>{ localStorage.clear(); sessionStorage.clear(); window.location.href = '/';window.location.reload()}} variant="outline-danger" size='sm'>Salir</Button> */}
                      </Form>
              </Navbar.Collapse>
              </Navbar.Collapse>
            </Container>
  
  
          </Navbar>
        </>
    )         
  }
  

  function Bye(){
    setTimeout(function(){
      localStorage.clear(); 
      sessionStorage.clear(); 
      window.location.href = '/';
      window.location.reload()
      //llamar la funcion que cierre la sesion en el backend...
  }, 3000);
   
  }

export default Navigation