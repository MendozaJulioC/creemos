import axios from "axios";
export async function GET(request){

let restotvotfecha;
   const reimcv = await axios.get('http://localhost:3001/estado/total/votos/fecha').then( async function(response) {                
    restotvotfecha= response.data
})
.catch(function (error) {
    // handle error
    console.log(error);
})
    return    Response.json(restotvotfecha)
}