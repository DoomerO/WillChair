const express = require('express');

const controllersUsers = require('./controllers/users/usersController');
const controllersOffers = require('./controllers/offers/offersController');

const routes = express.Router();

//User Routes
routes.get('/users', controllersUsers.searchUsers);
routes.get('/users/:email/:password', controllersUsers.searchUserEmailPassword);
routes.post('/users', controllersUsers.createUser);
routes.put('/users/:email', controllersUsers.updateUser);
routes.put('/usersPassword/:email', controllersUsers.updateUserPassword);
routes.delete('/users/:cod', controllersUsers.deleteUser);

//Offer Routes
routes.get('/offers', controllersOffers.searchOffers);
routes.post('/offers', controllersOffers.createOffer);
routes.put('/offers/:id', controllersOffers.updateOffer);
routes.delete('/offers/:id', controllersOffers.deleteOffer);

module.exports = routes;