const clientDB = require('../clientDB');

async function login(body){
    const response = {
        id: "",
        type_user: "",
        status: false,
        code: 500
    };
    const query = `SELECT * FROM users WHERE username='${body.username}' AND password='${body.password}';`;
    return new Promise((resolve) => {
        clientDB.query(query, (err, res) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
            } 
            else {
                if(res.rowCount >= 1){
                    response.id =  res.rows[0].id;
                    response.type_user = res.rows[0].type_user;
                    response.status = true;
                    response.code = 200;
                }
                else{
                    response.code = 400;
                }
            }
            resolve(response);
        });
    });
}

module.exports = {login};