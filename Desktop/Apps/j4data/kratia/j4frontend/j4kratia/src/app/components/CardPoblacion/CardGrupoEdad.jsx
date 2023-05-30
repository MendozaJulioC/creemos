import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

import Image from "next/image";
const formatter = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 0
  })

export default function CardGrupoEdad(props) {

let total = parseInt(props.grupo.r04)+
            parseInt(props.grupo.r59)+
            parseInt(props.grupo.r1014)+
            parseInt(props.grupo.r1519)+
            parseInt(props.grupo.r2024)+
            parseInt(props.grupo.r2529)+
            parseInt(props.grupo.r3034)+
            parseInt(props.grupo.r3539)+
            parseInt(props.grupo.r4044)+
            parseInt(props.grupo.r4549)+
            parseInt(props.grupo.r5054)+
            parseInt(props.grupo.r5559)+
            parseInt(props.grupo.r6064)+
            parseInt(props.grupo.r6569)+
            parseInt(props.grupo.r7074)+
            parseInt(props.grupo.r7579)+
            parseInt(props.grupo.r80mas)

let g519 =  parseInt(props.grupo.r59)+parseInt(props.grupo.r1014)+parseInt(props.grupo.r1519)
let g2034 =  parseInt(props.grupo.r2024)+parseInt(props.grupo.r2529)+parseInt(props.grupo.r3034)
let g3549 =  parseInt(props.grupo.r3539)+parseInt(props.grupo.r4044)+parseInt(props.grupo.r4549)
let g5064 =  parseInt(props.grupo.r5054)+parseInt(props.grupo.r5559)+parseInt(props.grupo.r6064)
let g65mas = parseInt(props.grupo.r6569)+parseInt(props.grupo.r7074)+parseInt(props.grupo.r7579)+parseInt(props.grupo.r80mas)

    return (
        <div className='  mt-2  mb-2'>
        <Nav className="justify-content-center " activeKey="/home">
            <Nav.Item>
                <Card className="shadow-lg" style={{ width: '10rem' }}>
                    <Card.Body className="text-center">
                        <Image

                            src="/img/baby.svg"
                            alt="Next.js Logo"
                            width={35}
                            height={35}
                            priority
                        />
                        <hr />
                        <p> <b> 0 - 4 Años  </b> </p>
                        <p>{formatter.format(props.grupo.r04)}</p>
                        <hr />
                        <p> {((props.grupo.r04 / total) * 100).toFixed(2)}%</p>
                    </Card.Body>
                </Card>
            </Nav.Item>
            <Nav.Item>
                <Card className="shadow-lg" style={{ width: '10rem' }}>
                    <Card.Body className="text-center">
                        <Image

                            src="/img/jovenes.svg"
                            style={{ borderRadius: '50%' }}
                            alt="5-19"
                            width={40}
                            height={40}
                            priority
                        />
                        <hr />
                        <p>  <b> 5 - 19 Años</b>  </p>
                        <p>{formatter.format(g519)}</p>
                        <hr />
                        <p> {((g519 / total) * 100).toFixed(2)}%</p>

                    </Card.Body>
                </Card>
            </Nav.Item>
            <Nav.Item>
                <Card className="shadow-lg" style={{ width: '10rem' }}>
                    <Card.Body className="text-center">
                        <Image
                            src="/img/prs3.svg"
                            alt="Next.js Logo"
                            width={35}
                            height={35}
                            priority
                        />
                        <hr />
                        <p> <b> 20-34 Años </b> </p>
                        <p>{formatter.format(g2034)}</p>
                        <hr />
                        <p> {((g2034 / total) * 100).toFixed(2)}%</p>
                    </Card.Body>
                </Card>
            </Nav.Item>
            <Nav.Item>
                <Card className="shadow-lg" style={{ width: '10rem' }}>
                    <Card.Body className="text-center">
                        <Image

                            src="/img/pers4.svg"
                            alt="Next.js Logo"
                            width={35}
                            height={35}

                            priority
                        />
                        <hr />
                        <p> <b> 35-49 Años</b> </p>
                        <p>{formatter.format(g3549)}</p>
                        <hr />
                        <p> {((g3549 / total) * 100).toFixed(2)}%</p>
                    </Card.Body>
                </Card>
            </Nav.Item>
            <Nav.Item>
                <Card className="shadow-lg" style={{ width: '10rem' }}>
                    <Card.Body className="text-center">
                        <Image

                            src="/img/pers5.svg"
                            alt="50-64"
                            width={35}
                            height={35}
                            priority
                        />
                        <hr />
                        <p>  <b>50-64 Años </b> </p>
                        <p>{formatter.format(g5064)}</p>
                        <hr />
                        <p> {((g5064 / total) * 100).toFixed(2)}%</p>
                    </Card.Body>
                </Card>
            </Nav.Item>
            <Nav.Item>
                <Card className="shadow-lg" style={{ width: '10rem' }}>
                    <Card.Body className="text-center">
                        <Image

                            src="/img/pers6.svg"
                            alt="Next.js Logo"
                            width={35}
                            height={35}
                            priority
                        />
                        <hr />
                        <p> <b> 65 - + Años </b> </p>
                        <p>{formatter.format(g65mas)}</p>
                        <hr />
                        <p> {((g65mas / total) * 100).toFixed(2)}%</p>

                    </Card.Body>
                </Card>
            </Nav.Item>
        </Nav>

        </div>

    );
}
