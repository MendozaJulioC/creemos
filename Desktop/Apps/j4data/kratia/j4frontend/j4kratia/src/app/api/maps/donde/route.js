import axios from "axios";
export async function GET(request){

let donde;
   const resgeo = await axios.get('http://localhost:3001/estado/gis/donde').then( async function(response) {
    donde= response.data.data[0].jsonb_build_object
})
.catch(function (error) {
    // handle error
    console.log(error);
})
    return    Response.json(donde)
}