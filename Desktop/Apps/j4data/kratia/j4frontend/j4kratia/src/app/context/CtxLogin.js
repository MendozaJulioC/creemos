'use client'
import { createContext, useContext, useState } from "react"

export const CtxLogin = createContext();

export const useKeys = ()=>{
    const usekey = useContext(CtxLogin);
    if(!usekey)throw new Error('useKeys debería ser usado con un provider')
    return usekey;
}


export const CtxLoginProvider = ({ children })=>{

    const [credenciales, setCredenciales]   = useState(
        [
            {
                success: false, 
                nombre: '',
                cedula: '',
                email:  '',
                rol:  '',
                token : ''
            }  
        ]
    );
    const createCredenciales = (success,nombre,cedula,email,rol, token)=>{
        setCredenciales([
       
            {
                success,
                nombre, 
                cedula,
                email, 
                rol,
                token 
            }
        ])
    }

    return <CtxLogin.Provider value={{
        credenciales, createCredenciales
    }}>
        {children}
    </CtxLogin.Provider>;

};

