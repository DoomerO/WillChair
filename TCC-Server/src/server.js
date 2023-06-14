const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(routes);

server.get('/', async (req, res) => {
    await res.send("Root of the Willchair server.");
});

module.exports = server;