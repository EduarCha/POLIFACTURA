const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});

/*
Copiar siguiente código y usar nxp para ejecutarlo desde la terminal de vs code 
"Ctrl+Ñ  para abrirla en windows" luego ctrl + R para refrescar en pagina 

npx json-server --watch db.json --port 3000

*/