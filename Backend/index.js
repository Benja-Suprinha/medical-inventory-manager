const express = require('express');
const cors = require('cors');
const loginService = require('./login/loginService');
const adminService = require('./admin/adminService');
const inventarioService = require('./inventario/inventarioService');

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

//LISTEN PORT
app.listen(port, () => {
  console.log(`LoginService listen on ${port}`);
});