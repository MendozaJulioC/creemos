import axios from "axios";
export async function GET(request){

let comunas;
   const respcomunas = await axios.get('http://localhost:3001/api/datos/lista/comunas').then( async function(response) {                
   comunas= response.data
})
.catch(function (error) {
    // handle error
    console.log(error);
})
    return    Response.json(comunas)
}