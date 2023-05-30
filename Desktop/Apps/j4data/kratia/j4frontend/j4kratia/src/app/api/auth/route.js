import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'
import axios from "axios";
import { serialize } from 'cookie'



export async function POST(request){

    let body = await request.json();
    let email = body.email.toString()
    let pass = body.password.toString()
    let success=false;let token;
    let credentials = {
        "email":email,
        "password":pass
    }
    let usuario=[];
    const respuesta = await axios.post(`http://localhost:3001/api/auth/login/`,credentials)
    .then( async function(response) {
        //console.log(response.data.token)
        if(response.data.token.length>0){
            success= true;
            usuario.push(  { success: true, 
                            nombre: response.data.data[0].nom_user,
                            cedula: response.data.data[0].cedula ,
                            email: response.data.data[0].email ,
                            rol: response.data.data[0].rol,
                            token : response.data.token
                        })
                       
        }else{
            success= false;
            usuario.push(  { success: false, 
                            nombre: '',
                            cedula: '',
                            email:  '',
                            rol:'',
                            token : ''
                        })
        }
          
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });


    if(success){
 
        return   NextResponse.json({usuario})
    }else{ 
        return NextResponse.json({usuario})
    }
 

}





