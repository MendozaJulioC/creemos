import axios from "axios";

export async function  GET (request, {params}){
    const Vigencia = params.vigencia
    let imcv;
       const  respimcvsector = await axios.get(`http://localhost:3001/api/datos/imcv/${Vigencia}`).then(async function(response) {
        imcv = response.data.data
        
    }).catch(function (error){ console.error('Error GET Poblacion', error);})
    return    Response.json(imcv)
}

