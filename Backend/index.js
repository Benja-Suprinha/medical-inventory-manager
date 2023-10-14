const express = require('express');
const loginService = require('./login/loginService');
const adminService = require('./admin/adminService');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('LoginService run');
});

//ENDPOINT LOGIN SERVICE
app.post('/auth/user', async (req, res) => {
    console.log(req.body);
    res.json(await loginService.login(req.body));
});

//ENDPOINT ADMIN SERVICE
app.post('/admin/create', async (req, res) => {
    console.log(req.body);
    res.json(await adminService.create(req.body));
});

app.listen(port, () => {
  console.log(`LoginService listen on ${port}`);
});