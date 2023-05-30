import { Pool } from 'pg';
let conex;

if(!conex){
    conex =  new Pool({
        user: process.env.BD_USER,
        host: process.env.BD_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.AWS_PASS,
        port: process.env.DB_PORT, 
        max: 20,
        idleTimeoutMillis: 300000000,
        connectionTimeoutMillis: 100000000

    })

    
}


export default conex;


