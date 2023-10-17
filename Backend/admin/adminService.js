const clientDB = require('../clientDB');

async function create(body){
    const response = {
        status: false,
        code: 500 
    };
    const query = `SELECT * FROM users WHERE username = '${body.username}';`
    return new Promise(resolve => {
        clientDB.query(query,(err, res)=>{
            if(err){
                console.error('Error al ejecutar la consulta 1:', err);
                resolve(response);
            }else{
                if(res.rowCount != 0) {
                    console.log('admin_service.create(): error usuario ya existe');
                    response.code = 400;
                    resolve(response);
                }else{
                    const query1 = `INSERT INTO "users" (ID_admin, type_user, username, "password", "name", mail, telefono) VALUES (${body.id_admin}, '${body.type_user}', '${body.username}', '${body.password}', '${body.name}', '${body.mail}', '${body.telefono}');`
                    clientDB.query(query1, (err, res) => {
                        if(err) {
                            console.error('Error al ejecutar la consulta2:', err);
                            resolve(response);
                        } 
                        else {
                            if(res.rowCount >= 1){
                                response.status = true;
                                response.code = 200;
                            }
                            else{
                                console.log('admin_service.create(): error fallo de query');
                                response.code = 400;
                            }
                            resolve(response);
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
    const query = `SELECT * FROM users;`
    return new Promise(resolve =>{
        clientDB.query(query,(err, res)=>{
            if(err){
                console.error('Error al ejecutar la consulta: ', err);
            }else{
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
    const query = `SELECT * FROM users WHERE id = ${body.id_user};`
    return new Promise(resolve => {
        clientDB.query(query,(err, res)=>{
            if(err){
                console.error("Error al ejecutar la consulta 1");
                resolve(response);
            }else{
                if(res.rowCount == 0){
                    console.log(`admin_service.update(): error usuario id=${body.id_user} no existe`);
                    response.code = 402;
                    resolve(response);
                }else{
                    const current_username = res.rows[0].username;
                    const query1 = `SELECT * FROM users WHERE username = '${body.username}' AND username != '${current_username}';`;
                    clientDB.query(query1,(err, res) =>{
                        if(err) {
                            console.error('Error al ejecutar la consulta 2');
                            resolve(response);
                        }else{
                            if(res.rowCount == 0){
                                const query2 = `UPDATE users SET ID_admin = ${body.id_admin}, type_user = '${body.type_user}', username = '${body.username}', "password" = '${body.password}', "name" = '${body.name}', mail = '${body.mail}', telefono = '${body.telefono}' WHERE id = ${body.id_user};`
                                clientDB.query(query2,(err, res)=>{
                                    if(err){
                                        console.error('Error al ejecutar la consulta 3');
                                        resolve(response);
                                    }else{
                                        response.status = true;
                                        response.code = 200;
                                        resolve(response);
                                    }
                                });
                            }else{
                                response.code = 401;
                                resolve(response);
                            }
                        }
                        
                    });
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
    const query = `DELETE FROM "users" WHERE id = ${body.id_user};`
    return new Promise(resolve => {
        clientDB.query(query, (err, res) => {
            if(err){
                console.error('Error al ejecutar la consulta');
                resolve(response);
            }  
            else{
                if(res.rowCount != 0){
                    response.status = true;
                    response.code = 200;
                }
                else{
                    response.code = 402;
                }
                resolve(response);
            }
        });
    });
    
};

module.exports = {create, read, update, deletee};