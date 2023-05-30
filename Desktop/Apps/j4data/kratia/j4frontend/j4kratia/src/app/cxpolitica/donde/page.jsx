
'use client'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L from 'leaflet'
import styles from '../donde/page.module.css'
import { useEffect } from 'react';
import axios from "axios"
import  React,{ useState, useRef , useMemo} from "react";
import { MapContainer, TileLayer,LayersControl ,LayerGroup,Marker, Popup,  FeatureGroup,  Polygon,  GeoJSON , useMap} from 'react-leaflet'

export default function page() {

    const MyData = () => {
        const [geojson, setGeojson] = useState();
        const map = useMap()
        const ifGeoJsonFirst = useRef(true)
        const paintmap = useMemo(() => { return pintamapa() }, [geojson])

        useEffect(() => {
            if (ifGeoJsonFirst.current) {
                getData()
            }
        }, [])

        async function getData() {
            try {
                const response = await axios.get('/api/maps/donde');
                setGeojson(response.data.features)
                ifGeoJsonFirst.current = false
            } catch (error) {
                console.error(error);
            }
        }

        async function pintamapa() {
            
            if (!ifGeoJsonFirst.current) {
                const geojsonObject = L.geoJSON(geojson, {
                    onEachFeature: function (features, layer) {
                        let popupContent = `                       
                            <div className="card" style="width: 18rem;">
                            <!-aquí podemos colocar una imagen-->     
                        <div class="card-body">
                            <h5 className="card-title">` + features.properties.NOMBRE + `</h5>
                            <p className="card-text">
                            <p  className="text-muted"  ;">Código Territorio <br> <b>`+ (features.properties.CODBARRIO) + `</b> </p>
                            <table className="table table-hover table-inverse table-responsive">
                                <tbody>
                                <tr>
                                <td>Líder</td>
                                <td>` + features.properties.NOMLIDER + `</td>
                            </tr>
                            <tr>
                              <td>Celular</td>
                              <td>` + features.properties.CELULAR + `</td>
                            </tr>
                            <tr>
                               <td>Email.</td>
                                <td>` + features.properties.EMAIL + `</td>
                            </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>`
                        let ToolTip = `${features.properties.NOMBRE} <br/>  `
                        layer.bindPopup(popupContent)
                        layer.bindTooltip(ToolTip, { permanent: false, direction: 'center' });
                    }
                }).addTo(map);

                map.fitBounds(geojsonObject.getBounds())

                return <GeoJSON data={geojson.features} />

            } else { return null }
        }
    };

    const MyData2 = () => {
        const [geocomuna, setGeoComuna] = useState()
        const ifGeoJson2 = useRef(true)
        const map = useMap()
        const pinta = useMemo(() => { return pintamapa2() }, [geocomuna])

        useEffect(() => {
            if (ifGeoJson2.current) {
                getData2()
            }
        }, [])

        async function getData2() {
            try {
                const rescomuna = await axios.get('/api/maps/medellin')
                setGeoComuna(rescomuna.data.features)
                ifGeoJson2.current = false
            } catch (error) {
                console.error(error);
            }
        }

        async function pintamapa2() {
            if (!ifGeoJson2.current) {
                const geojsonObjectComuna = L.geoJSON(geocomuna, {
                    style: style,
                    onEachFeature: function (features, layer) {
                        let ToolTip = `${features.properties.NOMBRE} <br/>  `
                        layer.bindTooltip(ToolTip, { permanent: false, direction: 'center' });
                    }
                }).addTo(map);

                map.fitBounds(geojsonObjectComuna.getBounds())
                function getColor(d) {
                    return d > 1000 ? '#ACBCFF' :
                        d > 500 ? '#ACBCFF' :
                            d > 200 ? '#ACBCFF' :
                                d > 100 ? '#ACBCFF' :
                                    d > 50 ? '#ACBCFF' :
                                        d > 20 ? '#ACBCFF' :
                                            d > 10 ? '#ACBCFF' :
                                                '#ACBCFF';
                }

                function style(features) {
                    return {
                        fillColor: getColor((features.properties.AREAHA)),
                        weight: 3,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.2
                    };
                }
                return <GeoJSON data={geocomuna.features} />
            } else { return null }
        }
    };

    const position = [6.25, -75.50];

    return (<>


        <div className='container-fluid'>


            <MapContainer className={styles.map} center={position} zoom={12} scrollWheelZoom={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position="topright">
                <LayersControl.Overlay checked name="Barrios">
                        <FeatureGroup >
                            
                         <MyData />
                        </FeatureGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Comunas">
                        <FeatureGroup >
                      
                        </FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl>

            </MapContainer>


        </div>
    </>
    )
}


