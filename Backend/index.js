const express = require('express');
const cors = require('cors');
const loginService = require('./login/loginService');
const adminService = require('./admin/adminService');
const inventarioService = require('./inventario/inventarioService');
const medicoService = require('./medico/medicoService');
const transaccionService = require('./transaccion/transaccionService');

const app = express();
const port = 3000;
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend Services run');
});

//ENDPOINT LOGIN SERVICE
app.post('/auth/user', async (req, res) => {
    res.json(await loginService.login(req.body));
});

//ENDPOINT ADMIN SERVICE
app.post('/admin/create', async (req, res) => {
    res.json(await adminService.create(req.body));
});

app.get('/admin/read', async (req, res) => {
  res.json(await adminService.read());
});

app.post('/admin/update', async (req, res) => {
  res.json(await adminService.update(req.body));
});

app.post('/admin/delete', async (req, res) => {
  res.json(await adminService.deletee(req.body));
});

//ENDPOINT INVENTARIO SERVICE
app.post('/inventario/create', async (req, res) => {
  res.json(await inventarioService.create(req.body));
});

app.get('/inventario/read', async (req, res) => {
  res.json(await inventarioService.read());
});

app.post('/inventario/update', async (req, res) => {
  res.json(await inventarioService.update(req.body));
});

app.post('/inventario/replenish', async (req, res) => {
  res.json(await inventarioService.replenish(req.body));
});

app.post('/inventario/delete', async (req, res) => {
  res.json(await inventarioService.deletee(req.body));
});

//ENDPOINT MEDICO SERVICE
app.get('/medico/read', async (req, res) => {
  res.json(await medicoService.read());
});

app.post('/medico/withdraw', async (req, res) =>{
  res.json(await medicoService.withdraw(req.body));
});

//ENDPOINT TRANSACCION SERVICE
app.get('/transaccion/read', async (req, res) => {
  res.json(await transaccionService.read());
});

//LISTEN PORT
app.listen(port, () => {
  console.log(`Backend listen on ${port}`);
});