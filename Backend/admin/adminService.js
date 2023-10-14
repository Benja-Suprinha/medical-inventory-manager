const clientDB = require('../clientDB');

async function create(body){
    const response = {
        status: false,
        code: 500 
    };
    const query = `SELECT * FROM users WHERE username = '${body.username}';`
    return new Promise((resolve) => {
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

module.exports = {create};