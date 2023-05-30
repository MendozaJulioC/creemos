import axios from "axios";

export async function  GET (request, {params}){
    const Vigencia = params.vigencia
    let datapoblamedbarrios;
  
    const  respoblamedvigencia = await axios.get(`http://localhost:3001/api/gis/poblamed/barrios/${Vigencia}`).then(async function(response) {
        
        datapoblamedbarrios = response.data.data[0].jsonb_build_object
    }).catch(function (error){ console.error('Error GET Poblacion', error);})
    return    Response.json(datapoblamedbarrios)
}