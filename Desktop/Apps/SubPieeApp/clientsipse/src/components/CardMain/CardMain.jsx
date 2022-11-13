import React from 'react'
import './card.css'
import Card from 'react-bootstrap/Card';

function CardGauge(props) {
  return (
  <>
    <Card className=' mt-3 shadow p-3 mb-5 bg-body rounded-5 fondo ' >
      <Card.Body className='text-center  text-muted'>
        <Card.Title >{props.ico}   </Card.Title>
          <br />
          {/* <Card.Link href="#"><button type="button" class="btn btn-success btn-block"> <span><FcBarChart/></span> Success</button></Card.Link> */}
          <Card.Link  href={props.urlgo} className='btn btn-outline-primary btn-flat  rounded-2'> <span className='display-8'>{props.title} </span></Card.Link>
        </Card.Body>
        <Card.Subtitle className="mb-1 text-muted text-center fw-lighter card-text">{props.subtitle}</Card.Subtitle>
    </Card>
  </>
  )
}

export default CardGauge