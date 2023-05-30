import axios from "axios";

export async function  GET (request, {params}){
    const Vigencia = params.vigencia
    let datapoblamedcomunas;
  
    const  respoblamedvigencia = await axios.get(`http://localhost:3001/api/gis/poblamed/comunas/${Vigencia}`).then(async function(response) {
        
        datapoblamedcomunas = response.data.data[0].jsonb_build_object
    }).catch(function (error){ console.error('Error GET Poblacion', error);})
    return    Response.json(datapoblamedcomunas)
}