const clientDB = require('../clientDB');

async function read(){
    const response = {
        status: false,
        code: 500,
        data: null
    };

    const query = `SELECT * FROM transacciones_inventario;`
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

module.exports = {read};