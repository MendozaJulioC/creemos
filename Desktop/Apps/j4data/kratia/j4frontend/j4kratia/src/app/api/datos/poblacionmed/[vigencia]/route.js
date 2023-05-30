import axios from "axios";

export async function  GET (request, {params}){
    const Vigencia = params.vigencia
 
   let datapoblamed;

    const  respoblamedvigencia = await axios.get(`http://localhost:3001/api/datos/poblamed/total/${Vigencia}`).then(async function(response) {
      
        datapoblamed = response.data.data
        
    }).catch(function (error){ console.error('Error GET Poblacion', error);})
    return    Response.json(datapoblamed)
}


