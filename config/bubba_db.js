import mysql from 'mysql2'

const config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Bubbas_API',
    password:'root',
    port: 3306,
});

//conectar a la DB
config.connect((err) =>{
    if(err){
        console.error(`No fue posible la conexion`, err);
    }else{
        console.log(`Conexion exitosa`)
    }
});

export default config;