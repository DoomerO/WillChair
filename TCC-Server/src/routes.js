const express = require('express');

const controllersUsers = require('./controllers/users/usersController');

const routes = express.Router();

//User Routes
routes.get('/users', controllersUsers.searchUsers);
routes.get('/userAuthentication/:email/:password', controllersUsers.searchUserEmailPassword);
routes.post('/users', controllersUsers.createUser);
routes.delete('/user/:cod', controllersUsers.deleteUser);

module.exports = routes;