import axios from "axios";

export async function  GET (request, {params}){
    const Vigencia = params.vigencia
    let datapoblamedrango;

    const  respoblamedvigencia = await axios.get(`http://localhost:3001/api/datos/poblamed/rangos/edad/sexo/${Vigencia}`).then(async function(response) {
        datapoblamedrango = response.data.data
    }).catch(function (error){ console.error('Error GET Rango Edad Sex Vigencia', error);})
    return    Response.json(datapoblamedrango)
}
