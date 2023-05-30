'use client'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import styles from './page.module.css'

import ChartCxPolitica from '../components/Chart/ChartCxPolitica'

function CxPoltica() {
  return (
    <>
    <div className='text-center'> <h1 className={styles.texto1}>Información Estratégica Histórica</h1>  </div>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title className={styles.label1}>Total votos por fecha</Card.Title>
            <Card.Text>
            <ChartCxPolitica/>
            </Card.Text>
          </Card.Body>
         
        </Card>
 
         <Card>
        <Card.Img variant="top" src="/img/maps-location-2.svg" width={200} height={200} />
          <Card.Body>
            <Card.Title>Total votos por candidato x fecha</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>


      <CardGroup>
     
        <Card>
        <Card.Img variant="top" src="/img/maps-location-2.svg" width={200} height={200} />
          <Card.Body>
            <Card.Title>Total votos por candidato x fecha</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="/img/maps-location-2.svg" width={200} height={200} />
          <Card.Body>
            <Card.Title>Total participación ultima fecha</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This card has even longer content than the
              first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="/img/maps-location-2.svg" width={200} height={200} />
          <Card.Body>
            <Card.Title>Total votos por partido x fecha</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Img variant="top" src="/img/maps-location-2.svg" width={200} height={200} />
          <Card.Body>
            <Card.Title>Total votos candidato x comuna x fecha</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>


      </CardGroup>

      <CardGroup>
     
        <Card>
          <Card.Img variant="top" src="/img/maps-location-2.svg" width={200} height={200} />
          <Card.Body>
            <Card.Title>Total votos por fecha</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="/img/maps-location-2.svg" width={200} height={200} />
          <Card.Body>
            <Card.Title>Total votos por candidato x fecha</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>




      </CardGroup>
    </>

  );
}

export default CxPoltica;
