const clientDB = require('../clientDB');

async function create(body){
    const response = {
        status: false,
        code: 500 
    };

    const query1 = `SELECT * FROM inventario WHERE name_product = '${body.name_product}';`;
    return new Promise(resolve => {
        clientDB.query(query1,(err, res)=>{
            if(err){
                console.error('Error al ejecutar la consulta 1:', err);
                resolve(response);
            }
            else{
                if(res.rowCount >= 1){
                    console.log("inventario_service.create(): error producto ya existe'")
                    response.code = 411;
                    resolve(response);
                }
                else{
                    const query2 = `INSERT INTO "inventario" ("name_product", "descripcion", cantidad, precio) VALUES ('${body.name_product}', '${body.descripcion}', ${body.cantidad}, ${body.precio});`;
                    clientDB.query(query2,(err, res)=>{
                        if(err){
                            console.error('Error al ejecutar la consulta 2:', err);
                            resolve(response);
                        }
                        else{
                            const query3 = `INSERT INTO "transacciones_inventario" (username, "name_product", fecha_operacion, tipo_operacion, cantidad) VALUES ('${body.username}', '${body.name_product}', CURRENT_TIMESTAMP, 1, ${body.cantidad});`
                            clientDB.query(query3,(err, res)=>{
                                if(err){
                                    console.error('Error al ejecutar la consulta 3:', err);
                                    resolve(response);
                                }
                                else{
                                    response.status = true;
                                    response.code = 200;
                                    resolve(response);
                                }
                            })
                        }
                    });
                }
            }
        });

    });
}

async function read(){
    const response = {
        status: false,
        code: 500,
        data: null
    };

    const query = `SELECT * FROM inventario;`
    return new Promise(resolve => {
        clientDB.query(query,(err, res)=>{
            if(err){
                console.error('Error al ejecutar la consulta: ', err);
            }
            else{
                response.status = true;
                response.code = 200;
                response.data = res.rows;
            }
            resolve(response);
        });
    });
}

module.exports = {create, read};