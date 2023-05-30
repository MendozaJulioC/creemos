
import axios from 'axios';
import { NextResponse } from "next/server";


export async function POST(request){
  const res = await request.json();
  let resp =[]
  const respuesta = await axios.post(`http://localhost:3001/api/auth/regsiter/lider`,res)
  .then( async function(response) {
      // console.log('Hola',response.data.data[0].nom_lider)
      resp.push({respuesta: response.data.data[0].nom_lider})
        
  })
  .catch(function (error) {
      // handle error
      console.log(error);
  })
  .finally(function () {
      // always executed
  });


  return NextResponse.json(resp); 
}