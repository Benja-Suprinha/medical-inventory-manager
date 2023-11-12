const clientDB = require('../clientDB');

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
                console.error('medico_service.read(): error al ejecutar la consulta: ', err);
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

async function withdraw(body){
    const response = {
        status: false,
        code: 500,
    };

    const query1 = `SELECT name_product, cantidad FROM inventario WHERE id = ${body.id_item};`;
    return new Promise(resolve => {
        clientDB.query(query1,(err,res)=>{
            if(err){
                console.error('medico_service.getInsumo(): error al ejecutar la consulta 1: ', err);
                resolve(response);
            }
            else{
                if(res.rowCount >= 1){
                    //console.log(res.rows[0]);
                    const name_product = res.rows[0].name_product;
                    const new_cantidad = parseInt(res.rows[0].cantidad) - body.cantidad;
                    if(new_cantidad >= 0 && parseInt(body.cantidad) > 0){
                        const query2 = `UPDATE inventario SET cantidad = ${new_cantidad} WHERE id = '${body.id_item}';`
                        clientDB.query(query2,(err, res)=>{
                            if(err){
                                console.error('medico_service.getInsumo(): error al ejecutar la consulta 2: ', err);
                                resolve(response);    
                            }
                            else{
                                const query3 = `INSERT INTO "transacciones_inventario" (username, "name_product", fecha_operacion, tipo_operacion, cantidad) VALUES ('${body.username}', '${name_product}', CURRENT_TIMESTAMP, 5, ${body.cantidad});`
                                clientDB.query(query3,(err, res)=>{
                                    if(err){
                                        console.error('medico_service.getInsumo(): error al ejecutar la consulta 3: ', err);
                                        resolve(response);
                                    }else{
                                        response.status = true;
                                        response.code = 200;
                                        resolve(response);
                                    }
                                })
                            }
                        })
                    }
                    else{
                        console.log('medico_service.getInsumo(): error, no es posible retirar esa cantidad')
                        response.code = 421
                        resolve(response);
                    }
                }
                else{
                    console.log("medico_service.getInsumo(): error el id_item no existe");
                    response.code = 412;
                    resolve(response);
                }
            }
        })
    });
}

module.exports = {read, withdraw};