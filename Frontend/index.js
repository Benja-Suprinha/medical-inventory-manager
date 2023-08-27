const fs = require('fs');
const http = require('http');
const PORT = 4200

const server = http.createServer((req, res) => {
    const html = fs.readFileSync('./index.html', 'utf-8');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});

server.listen(PORT)
console.log("Running on http://127.0.0.1:"+PORT)