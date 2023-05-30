import axios from "axios";
export async function GET(request){

let respgini;
   const reimcv = await axios.get('http://localhost:3001/api/datos/generales/gini').then( async function(response) {                
   respgini= response.data
})
.catch(function (error) {
    // handle error
    console.log(error);
})
    return    Response.json(respgini)
}