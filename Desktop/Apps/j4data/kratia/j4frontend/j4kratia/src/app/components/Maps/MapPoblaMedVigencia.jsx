'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L from 'leaflet'
import styles from '../../page.module.css'
import { useEffect } from 'react';
import axios from "axios"
import  React,{ useState } from "react";

import { MapContainer, TileLayer, Marker, Popup, Polygon,  GeoJSON , useMap} from 'react-leaflet'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider'

var Q_Color=[]
var Min=0; var Max=0; var Q1=0; var Q2=0; var Q3=0; var MQ1=0;  var MQ2=0; var MQ3=0;


export default function MapPoblaComunas({vigencia, geojson}) {


const position = [6.2982733, -75.5459204];

  const MyDataPoblaMed =()=>{

    //const [geojson, setGeojson] = useState();
    const map = useMap()

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 0
      })

    // useEffect(()=>{
    //     async function getData() {
    //       try {
    //         const response = await axios.get('/api/maps/poblacioncomunas/2023');
    //        console.log(response.data.features);
    //         setGeojson( response.data.features) 
    //         colormapa(response.data.features)
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     }
    //     getData() 
    //   }, [])

  
        //console.log(geojson)
        colormapa(geojson)

        const geojsonObject = L.geoJSON(geojson,{
          style:style,
          onEachFeature: function (features, layer) {
            let popupContent = `                       
            <div className="card" style="width: 18rem;">
            <!-aquí podemos colocar una imagen-->     
           <div class="card-body">
        
              <h5 class="card-title">` + features.properties.NOMBRE + `</h5>
                      <h6 class="card-subtitle mb-2 text-muted">  ${features.properties.CODCOMUNA}   </h6>
              <p class="card-text">
            
              <table class="table table-hover table-inverse table-responsive">
                <tbody>
                  <tr>
                      <td>Personas</td>
                      <td>` +formatter.format(features.properties.TOTAL) + `</td>
                  </tr>
                  <tr>  
                    <td>Hombres</td>
                    <td>` + formatter.format(features.properties.HOMBRES) + `</td>
                  </tr>
                  <tr>
                     <td>Mujeres</td>
                      <td>` + formatter.format(features.properties.MUJERES) + `</td>
                  </tr>
              
                </tbody>
              </table>
            </div>
          </div>`
            let ToolTip=`${features.properties.NOMBRE} <br/> Total: ${formatter.format(features.properties.TOTAL)}<br/> 
              Mujeres : ${formatter.format(features.properties.MUJERES)} <br/> 
              Hombres : ${formatter.format(features.properties.HOMBRES)} 
              `
              layer.bindPopup(popupContent)
              layer.bindTooltip(ToolTip,{ permanent: false , direction:'center' });
          }  
        }).addTo(map);
        map.fitBounds(geojsonObject.getBounds())
  
        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };
        
        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
            this._div.innerHTML =` <h4>Población por Comunas y Corregimientos 
            <br />${vigencia}</h4> 
            
            
            `
        };
        
        info.addTo(map);

        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info legend');
          var grades = [0, (parseInt(Min)), (parseInt(MQ1)), (parseInt(MQ2)), (parseInt(MQ3)), (parseInt(Max))],
            labels = [];
          // loop through our density intervals and generate a label with a colored square for each interval
          this._div.innerHTML += ' <p>  <b>  Rango Personas  </b></p>'
          for (var i = 0; i < grades.length; i++) {
          
            this._div.innerHTML += '<li style="    background:' + getColor((grades[i] + 1)) + '">  ' + grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '<br>' : '+  </li> ');
          }
  
  
          return this._div;
        };
    
        legend.addTo(map);
  
        function getColor(d) {
     
          return d >= Max  ? '#b30000' :
          d > MQ3 ? '#e34a33' :
          d > MQ2 ? '#fc8d59' :
          d > MQ1  ? '#fdbb84' :
          d >= Min ? '#fdd49e' :'#fef0d9' ;
        }
  
        function style(features) {
  
          return {
             fillColor: getColor((features.properties.TOTAL)),
              weight: 1,
              opacity: 1,
              color: 'gray',
              dashArray: '3',
              fillOpacity: 0.7
          };
        }
     
        return    <GeoJSON  data={geojson.features}/>
    

  }
  function colormapa(valores) {
    for (let index = 0; index <21; index++) {
       Q_Color.push(parseInt(valores[index].properties.TOTAL))
     }
     Q_Color.sort(function (a, b) { return a - b });
     Min = (Q_Color[0])
     Max = (Q_Color[Q_Color.length - 1])
     let tam = Q_Color.length
     Q1 = 0.25 * (tam + 1)
     if ((Q1 / parseInt(Q1)) > 1) { MQ1 = ((parseInt(Q_Color[parseInt(Q1)]) + parseInt(Q_Color[(parseInt(Q1) + 1)])) / 2) } else { MQ1 = parseInt(Q_Color[Q1]) }
     Q2 = 0.50 * (tam + 1)
     if ((Q2 / parseInt(Q2)) > 1) { MQ2 = ((parseInt(Q_Color[parseInt(Q2)]) + parseInt(Q_Color[(parseInt(Q2) + 1)])) / 2) } else { MQ2 = (Q_Color[Q2]) }
     Q3 = 0.75 * (tam + 1)
     MQ3 = (parseInt(Q_Color[parseInt(Q3)]) + parseInt(Q_Color[(parseInt(Q3) + 1)])) / 2
     if (MQ3 < MQ2) { MQ3 = (Q_Color[(parseInt(Q3) + 1)]) }
     else if ((Q3 / parseInt(Q3)) > 1) { MQ3 = ((Q_Color[parseInt(Q3)]) + parseInt(Q_Color[(parseInt(Q3) + 1)])) / 2 }
     else { MQ3 = Q_Color[Q3] }
   }





    return (
        <MapContainer className={styles.map} center={position} zoom={10} scrollWheelZoom={false} >
         
            <MyDataPoblaMed />   
                   
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
        </MapContainer>
    )
}


