import React from 'react'
import Card from 'react-bootstrap/Card';
import './cardsubmain.css'

function CardSubMain(props) {
  return (<>
    <Card className=' mt-3 shadow p-3 mb-4 bg-body rounded-5 fondo ' style={{height:'8rem'}} >
      <Card.Body className='text-center  text-muted'>
        <Card.Link  href={props.urlgo} className='btn btn-outline-primary btn-flat-submain rounded-2'>
          <span className='display-8'> {props.ico} {props.title} </span>
        </Card.Link>
      </Card.Body>
    </Card>
  </>   
  )
}

export default CardSubMain