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
                console.error('inventario_service.create(): error al ejecutar la consulta 1:', err);
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
                            console.error('inventario_service.create(): error al ejecutar la consulta 2:', err);
                            resolve(response);
                        }
                        else{
                            const query3 = `INSERT INTO "transacciones_inventario" (username, "name_product", fecha_operacion, tipo_operacion, cantidad) VALUES ('${body.username}', '${body.name_product}', CURRENT_TIMESTAMP, 1, ${body.cantidad});`
                            clientDB.query(query3,(err, res)=>{
                                if(err){
                                    console.error('inventario_service.create(): error al ejecutar la consulta 3:', err);
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
                console.error('inventario_service.read(): error al ejecutar la consulta: ', err);
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

async function update(body){
    const response = {
        status: false,
        code: 500,
    };

    const query1 = `SELECT * FROM inventario WHERE id = ${body.id_item};`;
    return new Promise(resolve =>{
        clientDB.query(query1,(err, res1)=>{
            if(err){
                console.error('inventario_service.update(): error al ejecutar la consulta 1: ', err);
                resolve(response);
            }
            else{
                if(res1.rowCount >= 1){
                    const current_name_product = res1.rows[0].name_product;
                    const query2 = `SELECT * FROM inventario WHERE name_product = '${body.name_product}' AND name_product != '${current_name_product}';`
                    clientDB.query(query2,(err, res2)=>{
                        if(err){
                            console.error('inventario_service.create(): error al ejecutar la consulta 2: ', err);
                            resolve(response);
                        }
                        else{
                            if(res2.rowCount >= 1){
                                console.log("inventario_service.update(): error el producto ya existe");
                                response.code = 411;
                                resolve(response);
                            }
                            else{
                                const query3 = `UPDATE inventario SET "name_product" = '${body.name_product}', "descripcion" = '${body.descripcion}', cantidad = ${body.cantidad}, precio = ${body.precio} WHERE id = ${body.id_item};`
                                clientDB.query(query3,(err,res)=>{
                                    if(err){
                                        console.error('inventario_service.update(): error al ejecutar la consulta 3: ', err);
                                        resolve(response);
                                    }
                                    else{
                                        const query4 = `INSERT INTO "transacciones_inventario" (username, "name_product", fecha_operacion, tipo_operacion, cantidad) VALUES ('${body.username}', '${body.name_product}', CURRENT_TIMESTAMP, 2, ${body.cantidad});`
                                        clientDB.query(query4, (err, res)=>{
                                            if(err){
                                                console.error('inventario_service.update(): error al ejecutar la consulta 4: ', err);
                                                resolve(response);
                                            }
                                            else{
                                                response.status = true;
                                                response.code = 200;
                                                resolve(response);
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    }) 
                    
                }else{
                    console.log("inventario_service.update(): error el id_item no existe");
                    response.code = 412;
                    resolve(response);
                }
            }
        })    
    });
}

async function replenish(body){
    const response = {
        status: false,
        code: 500,
    };

    const query1 = `SELECT name_product, cantidad FROM inventario WHERE id = ${body.id_item};`;
    return new Promise(resolve => {
        clientDB.query(query1,(err,res)=>{
            if(err){
                console.error('inventario_service.replenish(): error al ejecutar la consulta 1: ', err);
                resolve(response);
            }
            else{
                if(res.rowCount >= 1){
                    //console.log(res.rows[0]);
                    const name_product = res.rows[0].name_product;
                    const new_cantidad = parseInt(res.rows[0].cantidad) + body.cantidad;
                    const query2 = `UPDATE inventario SET cantidad = ${new_cantidad} WHERE id = '${body.id_item}';`
                    clientDB.query(query2,(err, res)=>{
                        if(err){
                            console.error('inventario_service.replenish(): error al ejecutar la consulta 2: ', err);
                            resolve(response);    
                        }
                        else{
                            const query3 = `INSERT INTO "transacciones_inventario" (username, "name_product", fecha_operacion, tipo_operacion, cantidad) VALUES ('${body.username}', '${name_product}', CURRENT_TIMESTAMP, 3, ${body.cantidad});`
                            clientDB.query(query3,(err, res)=>{
                                if(err){
                                    console.error('inventario_service.replenish(): error al ejecutar la consulta 3: ', err);
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
                    console.log("inventario_service.replinish(): error el id_item no existe");
                    response.code = 412;
                    resolve(response);
                }
            }
        })
    });
}

async function deletee(body){
    const response = {
        status: false,
        code: 500,
    };

    return new Promise(resolve => {
        const query1 = `SELECT * FROM inventario WHERE id = ${body.id_item};`;
        clientDB.query(query1,(err, res)=>{
            if(err){
                console.error('inventario_service.delete(): error al ejecutar la consulta 1:', err);
                resolve(response);
            }
            else{
                if(res.rowCount >= 1){
                    const name_product = res.rows[0].name_product;
                    const cantidad = res.rows[0].cantidad;
                    const query2 = `DELETE FROM inventario WHERE id = ${body.id_item};`
                    clientDB.query(query2,(err, res)=>{
                        if(err){
                            console.error('inventario_service.delete(): Error al ejecutar la consulta 2:', err);
                            resolve(response);
                        }
                        else{
                            const query3 = `INSERT INTO "transacciones_inventario" (username, "name_product", fecha_operacion, tipo_operacion, cantidad) VALUES ('${body.username}', '${name_product}', CURRENT_TIMESTAMP, 4, ${cantidad});`
                            clientDB.query(query3,(err, res)=>{
                                if(err){
                                    console.error('inventario_service.delete(): error al ejecutar la consulta 3: ', err);
                                    resolve(response);

                                }else{
                                    response.status = true;
                                    response.code = 200;
                                    resolve(response);
                                }
                            });
                        }
                    })
                }else{
                    console.log("inventario_service.detele(): error el id_item no existe");
                    response.code = 412;
                    resolve(response);
                }
            }
        });

    });
}

module.exports = {create, read, update, replenish, deletee};