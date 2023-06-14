const express = require('express');

const controllersUsers = require('./controllers/users/usersController');

const routes = express.Router();

//User Routes
routes.get('/users', controllersUsers.searchUsers);
routes.post('/users', controllersUsers.createUser);

module.exports = routes;