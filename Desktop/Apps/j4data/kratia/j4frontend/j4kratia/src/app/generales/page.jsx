'use client'

import Map from "../components/Maps/MapMain";
import MapVereda from "../components/Maps/MapVereda";
import MapBarrios from "../components/Maps/MapBarrios";
import MapCorregto from '../components/Maps/MapCorregimientos'
import MapComuna from '../components/Maps/MapComunas'
import MapPoblaComunas from '../components/Maps/MapPoblaMedVigencia'
import MapPoblaBarrios from '../components/Maps/MapPoblaMedBarriosVigencia'
import MapIPEX from "../components/Maps/MapaIPEX";
import MapGini from "../components/Maps/MapsGini";

import CardPoblacionMed from "../components/CardPoblacion/CardPoblaMed";
import CardGrupoEdad from "../components/CardPoblacion/CardGrupoEdad"
import CardIMCV from "../components/CardECV/CardImvc";
import CardIPM from '../components/CardECV/CardIPM'

import axios from "axios";
import { useState, useEffect } from "react";
import Router, { useRouter } from 'next/navigation'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Image from "next/image";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


import Chart from "../components/Chart/AmChart";
import ChartLineIMCV from '../components/Chart/CharLineIMCV'
import ChartLineIPM from '../components/Chart/ChartLineIPM'
import ChartColum from "../components/Chart/ChartColumn";
import ChartColumGini from "../components/Chart/ChartGiniColumn";


export default function page() {
    const router = useRouter()
    useEffect(()=>{ const session = sessionStorage.getItem('UserCook') ;  if(!session){  router.push('/login')}})

    const [key, setKey] = useState('home');

    const [geoVereda, setGeoVereda] = useState();
    const [geoBarrio, setGeoBarrio] = useState();
    const [geoCorregto, setGeoCorregto] = useState();
    const [geoComuna, setGeoComuna] = useState();
    const [ valor, setValor ] = useState(2023);

    const [vigenciaQuery, setVigenciaQuery] = useState(2023)
    const [ totalPobla, setTotalPobla ] = useState(2653729);
    const [ totalHombre, setTotalHombre ] = useState(1252750);
    const [ totalMujer, setTotalMujer ] = useState(1400979);
    const [ rangoedadsexvigencia, setRangoEdadSexVigencia ] = useState();
    const [totalgrupoedad, setTotalGrupoEdad]= useState({
        r04: 148788,
        r59: 151704,
        r1014: 157310,
        r1519: 179236,
        r2024: 217297,
        r2529: 244722,
        r3034: 234203,
        r3539: 207033,
        r4044: 186660,
        r4549: 155443,
        r5054: 152726,
        r5559: 160127,
        r6064: 142029,
        r6569: 112469,
        r7074: 82734,
        r7579: 56041,
        r80mas: 65207
    })
    const [imcv, setImcv] = useState({vigencia: 2022, results: 46.68 })
    const [ipm, setIpm]= useState({vigencia: 2022, results: 9.83 })
    const [yqimcv , setYqimcv] = useState(2022)

    const [modalShow, setModalShow] = useState(false);
    const [modalShowBarrio, setModalShowBarrio] = useState(false);
    const [modalShowCorregto, setModalShowCorregto] = useState(false);
    const [modalShowComuna, setModalShowComuna] = useState(false);
    const [modalShowPobla, setModalShowPobla] = useState(false);
    const [modalShowBarrioPobla, setModalShowBarrioPobla] = useState(false);
    const [modalShowGrupoPobla, setModalShowGrupoPobla] = useState()
    const [modalShowIPEX, setModalShowIpex] = useState(false)
 
    const [porcHombre, setPorcHombre ]= useState(47.21)
    const [porcMujer , setPorcMujer] =useState(57.79)

    const [geojson, setGeojson] = useState();
    //const [geoBarrioPob, setGeoBarrioPob] = useState();

    const handleMapVereda = async (e)=>{
        try {
            const response = await  axios.get('/api/maps/veredas');
            setGeoVereda(response.data.features)
            setModalShow(true)
        } catch (error) {
            console.error('ErrorhandlepMapVeredas',error);
        }
    }   
    const handleMapBarrios = async (e)=>{
        try {
         
            const response = await  axios.get('/api/maps/barrios');
            setGeoBarrio(response.data.features)
            setModalShowBarrio(true)
        } catch (error) {
            console.error('Error handleMapBarrios');
        }
    }
    const handleMapCorregto = async (e)=>{
        try {
        
            const response = await  axios.get('/api/maps/corregimientos');
            setGeoCorregto(response.data.features)
            setModalShowCorregto(true)
           
        } catch (error) {
            console.error('Error handleMapCorregto');
        }
    }
    const handleMapComuna = async (e)=>{
        try {
            const response = await  axios.get('/api/maps/comunas');
            setGeoComuna(response.data.features)
            setModalShowComuna(true)
          } catch (error) {
            console.error('Error handleMapComuna');
        }
    }
    const handleMapPoblaComuna = async(e)=>{
        try {
           
             const response = await axios.get( `/api/maps/poblacioncomunas/${vigenciaQuery}`);
             setGeojson(response.data.features) 
            setModalShowPobla(true)

        } catch (error) {
            console.error('Error handleMapPOblaComuna ', error);
        }
    }
    const handleMapPoblaBarrio = async(e)=>{
        try {
            const response = await axios.get( `/api/maps/poblacionbarrios/${vigenciaQuery}`);
            setGeojson(response.data.features) 
             setModalShowBarrioPobla(true)
        } catch (error) {
            console.error('Error');
        }
    }
    const handleGraphGrupoEdad = async(e)=>{
        try {
            let pyramid= [];
            const response = await axios.get(`/api/datos/rangoedadsex/${vigenciaQuery}`)
            response.data.forEach(element => {
                pyramid.push(
                    {
                        age: element.rango,
                        hombres: parseFloat(element.hombres) ,
                        mujeres: parseFloat(element.mujeres) 
                    }
                )
            });
            setRangoEdadSexVigencia(pyramid)
            setModalShowGrupoPobla(true)
        } catch (error) {
            console.error('Error');
        }
    }
    const handleMapIpex = async(req, rres)=>{
        try {
            const response = await axios.get(`/api/maps/ipex/${yqimcv}`)
           
            setGeojson(response.data.features)
            setModalShowIpex(true)

        } catch (error) {
            
        }
    }
    const  handleRange = async (e) => {setValor(e.target.value)}
    const handleRangeImcv = async(e)=>{setYqimcv(e.target.value)}
    const handleSubmitIMCV = async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const response = await axios.get(`/api/datos/imcv/${yqimcv}`)
      
        setImcv({
            vigencia: response.data[2].vigencia,
            results: response.data[2].results
        })
        const responseipm = await axios.get(`/api/datos/ipm/${yqimcv}`)
        setIpm({
            vigencia : responseipm.data[0].vigencia,
            results : responseipm.data[0].results
        })
        
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const response = await  axios.get(`/api/datos/poblacionmed/${valor}`);
        setTotalPobla (response.data[0].total)
        setTotalHombre( response.data[0].hombres)
        setTotalMujer(response.data[0].mujeres)
        setVigenciaQuery(response.data[0].vigencia)
        setPorcHombre ((( totalHombre/totalPobla)*100).toFixed(2))
        setPorcMujer  ((( totalMujer/totalPobla)*100).toFixed(2))

        const gruporesponse = await axios.get(`/api/datos/grupoedad/${valor} `);
        setTotalGrupoEdad(
            {
                r04:  gruporesponse.data[0].r04,
                r59:  gruporesponse.data[0].r59,
                r1014:  gruporesponse.data[0].r1014,
                r1519:  gruporesponse.data[0].r1519,
                r2024:  gruporesponse.data[0].r2024,
                r2529:  gruporesponse.data[0].r2529,
                r3034:  gruporesponse.data[0].r3034,
                r3539:  gruporesponse.data[0].r3539,
                r4044:  gruporesponse.data[0].r4044,
                r4549:  gruporesponse.data[0].r4549,
                r5054:  gruporesponse.data[0].r5054,
                r5559:  gruporesponse.data[0].r5559,
                r6064:  gruporesponse.data[0].r6064,
                r6569:  gruporesponse.data[0].r6569,
                r7074:  gruporesponse.data[0].r7074,
                r7579:  gruporesponse.data[0].r7579,
                r80mas:  gruporesponse.data[0].r80mas
            }
        )
    }

    return (
        <div className='container-xl li'>
            <hr />
            <p style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '500', color: '#13005A' }}>
                <strong>Información General</strong></p>
            <hr />
            <div>
                <div className="row  mt-2 p-1">
                    <Card className="tex-center">
                        <Card.Header> <p className="text-center" style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '500', color: '#13005A' }}><strong>Extensión del Distrito Medelllín</strong></p></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p className="text-center p-1" style={{ textAlign: 'left', fontSize: '38px', lineHeight: '18px', fontWeight: '500', color: '#13005A' }}>
                                        <strong>37.640 Ha </strong>
                                    </p>
                                </Card.Text>
                            </Card.Body>
                    </Card>
                    <CardGroup>
                        <Card>
                            <Card.Img variant="top" src="/img/maps-location-1.svg" width={50} height={50} />
                                <Card.Body>
                                    <Card.Title className="text-center" style={{ textAlign: 'left', fontSize: '24px', lineHeight: '18px', fontWeight: '500', color: '#13005A' }}>Urbano</Card.Title>
                                    <Card.Text className="text-center">
                                        <p> 11.161 Ha </p>
                                        <p> 29.7%</p>
                                    </Card.Text>
                                </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="/img/maps-location-2.svg" width={50} height={50} />
                                <Card.Body>
                                    <Card.Title className="text-center" style={{ textAlign: 'left', fontSize: '24px', lineHeight: '18px', fontWeight: '500', color: '#13005A' }}>Rural</Card.Title>
                                    <Card.Text className="text-center">
                                        <p>23.304 Ha</p>
                                        <p>69.9%</p>
                                   </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="/img/maps-location-3.svg" width={50} height={50} />
                                <Card.Body>
                                    <Card.Title className="text-center" style={{ textAlign: 'left', fontSize: '24px', lineHeight: '18px', fontWeight: '500', color: '#13005A' }}>Expansión Urbana</Card.Title>
                                    <Card.Text className="text-center">
                                        <p> 175,35 Ha </p>
                                        <p> 0.5%</p>
                                    </Card.Text>
                                </Card.Body>
                        </Card>
                    </CardGroup>
                </div>
            </div>
            {/* //text-align: center;font-size: 18px;line-height: 18px;font-weight: 600;color: #73879C;font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; */}
            <hr className="py-1" />
            <p style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '700', color: '#13005A' }}>División Política Administrativa</p>
            <hr className="py-1" />
            <Map />
            <div className="row mt-4">
                <div className='col-sm-12 col-md-3 col-lg-3' >
                    <div className="border border-2  border-warning text-bg-primary   shadow-lg">
                        <div className="card-body">
                            <p className="card-title text-center ">  Comunas </p>
                            <h1 className="card-text text-center display-1" >16</h1>
                            <div className="d-grid gap-2">
                                <Button variant="secondary" size="sm" onClick={handleMapComuna}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fillRule="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </Button>
                                <MyMapaComuna
                                    show={modalShowComuna}
                                    backdrop="static"
                                    keyboard={false}
                                    onHide={() => setModalShowComuna(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-3 col-lg-3' >
                    <div className=" border border-2  border-warning text-bg-warning   shadow-lg">
                        <div className="card-body">
                            <p className="card-title text-center ">  Corregimientos </p>
                            <h1 className="card-text text-center display-1" >5</h1>
                            <div className="d-grid gap-2">
                                <Button variant="secondary" size="sm" onClick={handleMapCorregto}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </Button>
                                <MyMapaCorregto
                                    show={modalShowCorregto}
                                    backdrop="static"
                                    keyboard={false}
                                    onHide={() => setModalShowCorregto(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-3 col-lg-3' >
                    <div className="border border-2  border-warning text-bg-success   shadow-lg">
                        <div className="card-body  ">
                            <p className="card-title text-center ">  Barrios </p>
                            <h1 className="card-text text-center display-1" >249</h1>
                            <div className="d-grid gap-2">
                                <Button variant="secondary" size="sm" onClick={handleMapBarrios}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </Button>
                                <MyMapaBarrios
                                    show={modalShowBarrio}
                                    backdrop="static"
                                    keyboard={false}
                                    onHide={() => setModalShowBarrio(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-3 col-lg-3' >
                    <div className="border border-2 border-warning text-bg-info   shadow-lg">
                        <div className="card-body">
                            <p className="card-title text-center ">  Veredas </p>
                            <h1 className="card-text text-center display-1" >54</h1>
                            <div className="d-grid gap-2">

                                <Button variant="secondary" size="sm" onClick={handleMapVereda}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </Button>
                                <MyMapaVereda
                                    show={modalShow}
                                    backdrop="static"
                                    keyboard={false}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="shadow p-3 mt-3">
                <hr className="py-1" />
                <p style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '700', color: '#13005A' }}>Estructura Poblacional</p>
                <hr className="py-1" />
                <div className='col-sm-12 p-2' >
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlInput1">
                                <Form.Label> <h1 style={{ textAlign: 'left', fontSize: '20px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }}> Proyección Poblacion por Año (2018-2030)</h1> </Form.Label>
                                <Form.Range min={2018} max={2030} size='sm' step={1}
                                    onChange={handleRange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" as={Col} controlId="exampleForm.ControlTextarea1">
                            </Form.Group>
                        </Row>
                        <InputGroup className="mb-3">
                            <Form.Control className="text-center  border-4" size="sm" value={valor} />
                            <Button type="submit" variant="outline-secondary" id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#8BBCCC" className="bi bi-binoculars" viewBox="0 0 16 16">
                                    <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V2.5zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5h-1zM6 4pv.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13pv-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13pV7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V4zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V3zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14z" />
                                </svg> Consultar
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
                <CardPoblacionMed
                    yearquery={totalPobla}
                    hombres={totalHombre}
                    mujeres={totalMujer}
                    vigencia={vigenciaQuery}
                    porcHombres={porcHombre}
                    porcMujeres={porcMujer}
                />
                <div className='col-sm-12 col-md-12 col-lg-12 p-2 text-center mt-1' >
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            onClick={handleMapPoblaComuna}
                            className="btn btn-primary btn-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                            Mapa Proyección Población Comunas/Corregimientos vigencia {vigenciaQuery}
                        </button>
                        <MyMapaPoblaComuna
                            show={modalShowPobla}
                            backdrop="static"
                            keyboard={false}
                            onHide={() => setModalShowPobla(false)}
                            ano={vigenciaQuery}
                            geo={geojson}
                        />
                        <button
                            type="button"
                            onClick={handleMapPoblaBarrio}
                            className="btn btn-success btn-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                            Mapa Proyección Población por Barrios vigencia {vigenciaQuery}
                        </button>
                        <MyMapaPoblaBarrio
                            show={modalShowBarrioPobla}
                            backdrop="static"
                            keyboard={false}
                            onHide={() => setModalShowBarrioPobla(false)}
                            year={vigenciaQuery}
                            dato={geojson}
                        />
                        <button
                            type="button"
                            className="btn btn-info btn-sm"
                            onClick={handleGraphGrupoEdad}
                        >   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                            Población por grupos de edad y sexo vigencia {vigenciaQuery}
                        </button>
                        <MyChartPoblaGrupo
                            show={modalShowGrupoPobla}
                            backdrop="static"
                            keyboard={false}
                            onHide={() => setModalShowGrupoPobla(false)}
                            year={vigenciaQuery}
                            dateo={rangoedadsexvigencia}
                        />
                    </div>
                </div>
                <div className='col-sm-12 p-2' >
                    <CardGrupoEdad grupo={totalgrupoedad} />
                </div>
            </section>

            <section className="shadow-lg p-3 mt-3">
                <hr className="py-1" />
                <p style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '700', color: '#13005A' }}>Condiciones de Vida  </p>
                <hr className="py-2" />
                <div className='col-sm-12 p-2' >
                    <Form onSubmit={handleSubmitIMCV}>
                        <Row className="mb-3">
                            <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlInput2">
                                <Form.Label> <h1 style={{ textAlign: 'left', fontSize: '20px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }}> Seleccione 2010-2022</h1> </Form.Label>
                                <Form.Range min={2010} max={2022} defaultValue={2022} size='sm' step={1}
                                    onChange={handleRangeImcv}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" as={Col} controlId="exampleForm.ControlTextarea2"></Form.Group>
                        </Row>
                        <InputGroup className="mb-3">
                            <Form.Control className="text-center  border-4" size="sm" value={yqimcv} />
                            <Button type="submit" variant="outline-secondary" id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#8BBCCC" className="bi bi-binoculars" viewBox="0 0 16 16">
                                    <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V2.5zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5h-1zM6 4pv.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13pv-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13pV7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V4zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V3zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14z" />
                                </svg> Consultar
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
                <div className="row">
                    <div className="mt-2 col-sm-12">
                        <hr className="py-2" />
                        <h1 style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }}><strong> Índice Multidimensional de Condiciones de Vida  <code>(IMCV)  </code> </strong></h1> 
                        <h1 style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '400', color: '#4C6793' }}> Fuente: Encuesta de Calidad de Vida de Medellín</h1>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <CardIMCV imcv={imcv} />
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-9">
                        <Card className="shadow-lg">
                            <ChartLineIMCV />
                            <h1 className='mb-4'></h1>
                            <p style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '100', color: '#474E68' }}>
                                <strong>
                                    Fuente: Departamento Administrativo de Planeación de Medellín con base a la Encuesta de Calidad de Vida (ECV) <br />
                                    El cálculo del IMCV 2020 no es comparable con la serie histórica
                                </strong>
                            </p>
                        </Card>
                    </div>
                    <div className="col-sm-12">
                        <div className="card-body p-2">
                            <p className="card-text" style={{ textAlign: 'left', fontSize: '14px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }} >
                                El IMCV es una medida de bienestar que permite conocer las condiciones de vida de los ciudadanos de Medellín a través de 15 dimensiones.
                                Este toma valores entre 0 y 100, siendo el último su valor máximo.
                            </p>
                        </div>
                    </div>
                    <div className="mt-2 col-sm-12">
                        <hr className="py-2" />
                        <h1 style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }}><strong>   Índice de Pobreza Multidimensional <code>(IPM)</code></strong> </h1>
                        <h1 style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '400', color: '#4C6793' }}> Fuente: Encuesta de Calidad de Vida de Medellín</h1>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-9">
                        <Card className="shadow-lg">
                            <ChartLineIPM />
                            <h1 className='mb-4'></h1>
                            <p style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '100', color: '#474E68' }}>
                                <strong>
                                    Fuente: Encuesta de Calidad de Vida Medellín 2010 a 2019 y 2021, 2022.  <br />
                                    Fuente 2020* : Información para el 2020 elaboración propia a partir de formulario ECV – IPM año 2020. <br />
                                    El diseño muestral de la ECV no tiene desagregación por grupos etarios, o minorías, se hace solo para comunas y
                                    corregimientos, proporcionando una distribución respecto a la misma. <br />
                                    Los cruces que se desarrollen, pueden evaluar
                                    tendencias como ejercicio de la misma intersección entre las variables, más no es representativo para otro grado de
                                    desagregación.
                                </strong>
                            </p>
                        </Card>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <CardIPM ipm={ipm} />
                    </div>
                    <div className="card-body p-2">
                        <p className="card-text" style={{ textAlign: 'left', fontSize: '14px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }} >
                            Para Colombia se considera un hogar pobre de manera multidimensional si tiene al menos 5 de 15 privaciones.
                        </p>
                    </div>
                    <div className="mt-2 col-sm-12">
                        <hr className="py-2" />
                        <h1 style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }}> <strong> Índice de Pobreza Extrema   </strong>  </h1>
                        <h1 style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '400', color: '#4C6793' }}> Fuente: Gran Encuesta Integrada de Hogares (GEIH) para Medellín</h1>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-2">
                        <ChartColum  title={'Índice de Pobreza Extrema'}/>
                        <h1 className='mb-4'></h1>
                        <p className="card-text" style={{ textAlign: 'left', fontSize: '14px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }} >
                            <strong>
                                Porcentaje de población que no tiene los recursos suficientes para adquirir los requerimientos calóricos y nutricionales para su subsistencia.
                              	<br />
                            </strong>
                        </p>
                        <p style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '100', color: '#474E68' }}>   Notas: </p>
                           	
                            <ul style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '100', color: '#474E68' }}>
                               <li> Fuente: DANE Gran Encuesta Integrada de Hogares</li>
                               <li>Para los años anteriores del 2020 los datos expandidos con proyecciones de población, elaboradas con base en los resultados del censo 2005.</li>    
                               <li>Para los años posteriores del 2020 los datos expandidos con  proyección de población base Censo 2018 y incluye la informacion por comunas y corregimientos"</li>
                               <li>La construcción de las líneas de pobreza se realiza a partir de las encuestas de gasto de los hogares, y para el caso colombiano, hasta el año 2018, la fuente de información de la
                                    estructura de gasto era la Encuesta Nacional de Ingresos y Gastos (ENIG) 2006-2007. Actualmente, el país cuenta con la Encuesta Nacional de Presupuesto de los Hogares (ENPH) 2016-2017, que provee la información requerida para actualizar las líneas de pobreza, incorporando los nuevos patrones de consumo de los hogares colombianos. Por esta razón, entre 2018 y 2020 el Comité de Expertos en Pobreza llevó cabo un proceso de actualización de la metodología de cálculo de las líneas de pobreza. <br />
                                    Por tanto, los resultados presentados en esta publicación corresponden a las nuevas cifras oficiales de pobreza del país, que en efecto resultan de la implementación de ajustes metodológicos (nuevas líneas de pobreza monetaria extrema y pobreza monetaria). Estas cifras no son comparables con las cifras de la serie MESEP.
                                </li>
                                <li>Debido al cambio en el operativo de recolección de la GEIH por la pandemia del COVID-19, no fue posible obtener información de subempleo entre los meses de marzo y julio de 2020.</li>
                                <li>los datos "nd" no se encuentran disponibles por la reducción del numero de  variables del instrumento de recoleccion de la GEIH del año 2020  por efectos metodológicos  ante la situación actual del COVID19, año 2020.</li>
                            </ul>	
                      <hr />
                        <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={handleMapIpex}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe2" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                            </svg>
                            &nbsp; IPEX por Comunas {ipm.vigencia}
                        </button>
                        <MyMapaIPEX
                            show={modalShowIPEX}
                            backdrop="static"
                            keyboard={false}
                            onHide={() => setModalShowIpex(false)}
                            year={yqimcv}
                            dateo={geojson}
                        />
                           										
                    </div>
                    <div className="mt-2 col-sm-12">
                        <hr className="py-1" />
                        <h1 style={{ textAlign: 'left', fontSize: '18px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }}><strong>   Coeficiente de Gini </strong> </h1>
                        <h1 style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '400', color: '#4C6793' }}> Fuente: Gran Encuesta Integrada de Hogares (GEIH) para Medellín</h1>
                        <hr className="py-2" />
                    </div>
                    <div className="mt-2 col-sm-12">
                    <ChartColumGini  title={'Coeficiente de Gini'}/>
                    <h1 className='mb-4'></h1>
                    <p className="card-text" style={{ textAlign: 'left', fontSize: '14px', lineHeight: '18px', fontWeight: '500', color: '#4C6793' }} >
                        <strong>
                               Índice que permite conocer que tan desigual en términos de ingresos esta la población de una ciudad, región o país. 
                               Establece su valor en el rango de 0 y 1, donde entre más cerca al 1 se encuentre mayor será el nivel de desigualdad.
                              	<br />
                        </strong>
                    </p>
                    <p style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '100', color: '#474E68' }}>   Notas: </p>
                           	
                        <ul style={{ textAlign: 'left', fontSize: '10px', lineHeight: '10px', fontWeight: '100', color: '#474E68' }}>
                            <li> Fuente: DANE Gran Encuesta Integrada de Hogares</li>
                            <li>Para los años anteriores del 2020 los datos expandidos con proyecciones de población, elaboradas con base en los resultados del censo 2005.</li>    
                            <li>Para los años posteriores del 2020 los datos expandidos con  proyección de población base Censo 2018 y incluye la informacion por comunas y corregimientos"</li>
                            <li>La construcción de las líneas de pobreza se realiza a partir de las encuestas de gasto de los hogares, y para el caso colombiano, hasta el año 2018, la fuente de información de la
                                estructura de gasto era la Encuesta Nacional de Ingresos y Gastos (ENIG) 2006-2007. Actualmente, el país cuenta con la Encuesta Nacional de Presupuesto de los Hogares (ENPH) 2016-2017, que provee la información requerida para actualizar las líneas de pobreza, incorporando los nuevos patrones de consumo de los hogares colombianos. Por esta razón, entre 2018 y 2020 el Comité de Expertos en Pobreza llevó cabo un proceso de actualización de la metodología de cálculo de las líneas de pobreza. <br />
                                Por tanto, los resultados presentados en esta publicación corresponden a las nuevas cifras oficiales de pobreza del país, que en efecto resultan de la implementación de ajustes metodológicos (nuevas líneas de pobreza monetaria extrema y pobreza monetaria). Estas cifras no son comparables con las cifras de la serie MESEP.
                            </li>
                            <li>Debido al cambio en el operativo de recolección de la GEIH por la pandemia del COVID-19, no fue posible obtener información de subempleo entre los meses de marzo y julio de 2020.</li>
                            <li>los datos "nd" no se encuentran disponibles por la reducción del numero de  variables del instrumento de recoleccion de la GEIH del año 2020  por efectos metodológicos  ante la situación actual del COVID19, año 2020.</li>
                        </ul>	
                      <hr />
                    <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={handleMapIpex}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe2" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                            </svg>
                            &nbsp; GINI por Comunas {ipm.vigencia}
                        </button>
                        <MyMapaGini
                            show={modalShowIPEX}
                            backdrop="static"
                            keyboard={false}
                            onHide={() => setModalShowIpex(false)}
                            year={yqimcv}
                            dateo={geojson}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function MyMapaVereda(props) {
    return (
      <Modal
        {...props}
        fullscreen = {true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           <b>Veredas</b> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
          <p>
           Con una Extensión territorial del <b>69.9%</b> 
           <br /> Compuesto por <b>54</b> veredas en <b>5</b>  corregimientos, contempla la mayor extensión territorial del Distrito.
          </p>
          <MapVereda/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
        </Modal.Footer>
      </Modal>
    );
}

function MyMapaBarrios(props){
      return (
          <Modal
              {...props}
             fullscreen = {true}
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      <b>Barrios</b>
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p>
                      Con una Extensión territorial del <b>29.7%</b>
                      <br /> Compuesto por <b>249</b> barrios en <b>16</b>  comunas.
                  </p>
                  <MapBarrios />
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
              </Modal.Footer>
          </Modal>
      );
}

function MyMapaCorregto(props){
    return (
        <Modal
            {...props}
            fullscreen = {true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b>Corregimientos</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Con una Extensión territorial del <b>69.9%</b>
                    <br /> Compuesto por <b>5</b> Corregimientos y un total de  <b>23.304 Ha</b>.
                </p>
                <MapCorregto />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
            </Modal.Footer>
        </Modal>
    );
}

function MyMapaComuna(props){
    return (
        <Modal
            {...props}
            fullscreen = {true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b>Comunas</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
          
                </p>
                <MapComuna />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
            </Modal.Footer>
        </Modal>
    );
}

function MyMapaPoblaComuna(props){
      
    return (
        <Modal
            {...props}  
            fullscreen = {true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b>Población Por Comunas y Corregimientos   {props.ano} </b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <MapPoblaComunas vigencia={props.ano} geojson={props.geo} />
              
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
            </Modal.Footer>
        </Modal>
    );

}

function MyMapaPoblaBarrio(props){
    return (
        <Modal
            {...props}  
            fullscreen = {true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b>Población Por Comunas y Corregimientos  {props.ano} </b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <MapPoblaBarrios vigencia={props.year} geojson={props.dato} />
               {/* <MapPoblaComunas vigencia={props.year} geojson={props.dato} /> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
            </Modal.Footer>
        </Modal>
    );

}

function MyChartPoblaGrupo(props){
    try {
        return (
            <Modal
                {...props}  
                // fullscreen = {true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <b>Población Por Grupos de Edad {props.year} </b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                   
                <Chart  data ={props.dateo}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
                </Modal.Footer>
            </Modal>
        );
    } catch (error) {
        console.error('Error MyChartPoblaGrupo: ', error);
    }
}

function MyMapaIPEX(props){
    return (
        <Modal
            {...props}  
            fullscreen = {true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b>Índice de Pobreza Extrema  {props.year} </b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
           <MapIPEX vigencia={props.year} geojson={props.dateo} />
              
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
            </Modal.Footer>
        </Modal>
    );
}
function MyMapaGini(props){
    return (
        <Modal
            {...props}  
            fullscreen = {true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b>Coeficiente de Gini {props.year} </b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
           <MapGini vigencia={props.year} geojson={props.dateo} />
              
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" size="sm" onClick={props.onHide}>Salir</Button>
            </Modal.Footer>
        </Modal>
    ); 
}