const server = require('./src/server');

const PORT = 3344;

server.listen(PORT, console.log("Server on in door " + PORT));