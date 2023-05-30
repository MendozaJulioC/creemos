import axios from "axios";

export async function  GET (request, {params}){
    const Vigencia = params.vigencia

    let dataipmcomunas;
  
    const  respoblamedvigencia = await axios.get(`http://localhost:3001/api/datos/generales/territorio/ipm/${Vigencia}`).then(async function(response) {
        
        dataipmcomunas = response.data.data[0].jsonb_build_object
    }).catch(function (error){ console.error('Error GET IPM Comunas', error);})
    return    Response.json(dataipmcomunas)
}