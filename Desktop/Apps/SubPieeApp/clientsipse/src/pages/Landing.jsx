
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container  from 'react-bootstrap/Container';


function Landing() {
  return (
    <div>

<style type="text/css">
        {`
    .btn-flat {
      background-color: red;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.3rem;
      font-size: 1.0rem;
    }

    .container-hola{

       background-color: red;
  
  }
    `}
      </style>
      <Container variant='hola'>
      <div>
        <h1> DistriData </h1>
        <Alert variant="warning">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>
        Aww yeah, you successfully read this important alert message. This
        example text is going to run a bit longer so that you can see how
        spacing within an alert works with this kind of content.
      </p>
      <hr />
      <p className="mb-0">
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </p>
    </Alert>
       
    <Button variant="flat" size="xxl">
        flat button
      </Button>
       </div>

      </Container>
      



    </div>
  )
}

export default Landing