// import 'leaflet/dist/leaflet.css'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
// import * as L from 'leaflet'
// import styles from '../../page.module.css'
// import { useEffect } from 'react';
// import axios from "axios"
// import  React,{ useState } from "react";

// import { MapContainer, TileLayer, Marker, Popup, Polygon,  GeoJSON } from 'react-leaflet'



// const myData= ()=>{
//   const [geojson, setGeojson] = useState();
//   const map = useMap()

//   useEffect(()=>{
//       async function getData() {
//         try {
//           const response = await axios.get('/api/maps');
        
//           setGeojson( response.data) 
//         } catch (error) {
//           console.error(error);
//         }
//       }
//       getData() 
//     }, [])


//     if (geojson){
//       const geojsonObject = L.geoJSON(geojson);
//       map.fitBounds(geojsonObject.getBounds())
   
//       return    <GeoJSON  data={geojson} />

//     }else{ return null
//     }

// };
