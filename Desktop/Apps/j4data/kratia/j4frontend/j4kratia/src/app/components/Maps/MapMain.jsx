"use client"
 
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L from 'leaflet'
import styles from '../../page.module.css'
import { useEffect } from 'react';
import axios from "axios"
import  React,{ useState, useRef , useMemo} from "react";

import { MapContainer, TileLayer, Marker, Popup, Polygon,  GeoJSON , useMap} from 'react-leaflet'
var Q_Color=[]
var Min=0; var Max=0; var Q1=0; var Q2=0; var Q3=0; var MQ1=0;  var MQ2=0; var MQ3=0;

export default function Map(props) {
  const MyMain= ()=>{
    const [geojson, setGeojson] = useState();
    const ifGeoJsonFirst = useRef(true)
    const map = useMap()

    const paintmap = useMemo(()=>{ return pintamapa() }, [geojson] )
  
    useEffect(()=>{
        if (!ifGeoJsonFirst.current){
             getData() 
        }
    }, [])
    
  async function getData() {
    try {
      if (ifGeoJsonFirst.current){
        const response = await axios.get('/api/maps');
        setGeojson( response.data.features) 
        ifGeoJsonFirst.current = false
      }
    } catch (error) {
      console.error(error);
    } 
  }
  
 function pintamapa (){
  
     if (!ifGeoJsonFirst.current){
        colormapa(geojson)
        const geojsonObject = L.geoJSON(geojson,{
          style:style,
          onEachFeature: function (features, layer) {
            let popupContent = `                       
            <div className="card" style="width: 18rem;">
            <!-aquí podemos colocar una imagen-->     
           <div class="card-body">
              <h5 class="card-title">` + features.properties.NOMBRE + `</h5>
              <h6 class="card-subtitle mb-2 text-muted">  ` + features.properties.SUBTIPO+ `</h6>
              <p class="card-text">
              <p  class="text-muted"  ;">Código Territorio <br> <b>`+ (features.properties.CODCOMUNA) + `</b> </p>
              <table class="table table-hover table-inverse table-responsive">
                <tbody>
                  <tr>
                    <td>Kms.<sup>2</sup></td>
                    <td>` + features.properties.AREAKM2 + `</td>
                  </tr>
                 <tr>
                    <td>Hectárea</td>
                    <td>` + features.properties.AREAHA + `</td>
                  </tr>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`
            let ToolTip=`${features.properties.NOMBRE} <br/> Hectáreas: ${features.properties.AREAHA}<br/> Kms.<sup>2</sup> : ${features.properties.AREAKM2} `
              layer.bindPopup(popupContent)
              layer.bindTooltip(ToolTip,{ permanent: false , direction:'center' });
          }  
        }).addTo(map);
        map.fitBounds(geojsonObject.getBounds())
           
        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info legend');
          var grades = [0, (parseInt(Min)), (parseInt(MQ1)), (parseInt(MQ2)), (parseInt(MQ3)), (parseInt(Max))],
            labels = [];
          // loop through our density intervals and generate a label with a colored square for each interval
          this._div.innerHTML += ' <p>  <b> Hectáreas </></p>'
          for (var i = 0; i < grades.length; i++) {
            this._div.innerHTML += '<li style="    background:' + getColor((grades[i] + 1)) + '">  ' + grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '<br>' : '+  </li> ');
          }
          return this._div;
        };
        legend.addTo(map);
  
        function getColor(d) {
          return d >= Max  ? '#016c59' :
          d > MQ3 ? '#1c9099' :
          d > MQ2 ? '#67a9cf' :
          d > MQ1  ? '#a6bddb' :
          d >= Min ? '#d0d1e6' :'#f6eff7' ;
        }
  
        function style(features) {
          return {
             fillColor: getColor((features.properties.AREAHA)),
              weight: 1,
              opacity: 1,
              color: 'gray',
              dashArray: '3',
              fillOpacity: 0.7
          };
        }
        return <GeoJSON  data={geojson.features}/>
  
      }else{  return null     } 
    }
  };

    const position = [6.25, -75.60];
    return (
        <MapContainer className={styles.mapintro} center={position} zoom={12} scrollWheelZoom={false} >
                 <MyMain />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}
 
function colormapa(valores) {
 for (let index = 0; index <21; index++) {
    Q_Color.push(parseInt(valores[index].properties.AREAHA))
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