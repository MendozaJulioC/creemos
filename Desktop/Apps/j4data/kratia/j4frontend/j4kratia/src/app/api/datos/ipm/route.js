import axios from "axios";
export async function GET(request){

let respipm;
   const reimcv = await axios.get('http://localhost:3001/api/datis/generales/ipm/').then( async function(response) {                

    respipm= response.data

})
.catch(function (error) {
    // handle error
    console.log(error);
})
    return    Response.json(respipm)
}