import axios from "axios";

export async function  GET (request, {params}){
    const Vigencia = params.vigencia
    let grupoedadpoblamedvigencia;
    const  gruposedadpoblamed = await axios.get(`http://localhost:3001/api/datos/poblamed/grupos/${Vigencia}`).then(async function(response) {
        grupoedadpoblamedvigencia = response.data.data
    }).catch(function (error){ console.error('Error GET Grupo Poblacion', error);})
    return    Response.json(grupoedadpoblamedvigencia)
}