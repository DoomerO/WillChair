const express = require('express');
const auth = require('./middleware/auth')
const controllersUsers = require('./controllers/users/usersController');
const controllersOffers = require('./controllers/offers/offersController');
const controllersMessages = require('./controllers/messages/messagesController');
const { contentSecurityPolicy } = require('helmet');

const routes = express.Router();

//User Routes
routes.get('/users', controllersUsers.searchUsers);
routes.get('/users/:email/:password', controllersUsers.searchUserEmailPassword);
routes.post('/users', controllersUsers.createUser);
routes.put('/users/:email', controllersUsers.updateUser);
routes.put('/usersPassword/:email', controllersUsers.updateUserPassword);
routes.delete('/users/:id', controllersUsers.deleteUser);

//Offer Routes
routes.get('/offers', controllersOffers.searchOffers);
routes.post('/offers', controllersOffers.createOffer);
routes.put('/offers/:id', controllersOffers.updateOffer);
routes.delete('/offers/:id', controllersOffers.deleteOffer);

//Messages Routes
routes.get('/messages', controllersMessages.getMessages);
routes.get('/messages/:chat_id', controllersMessages.getMessagesChat);
routes.post('/messages', controllersMessages.createMessages);
routes.delete('/messages/:id', controllersMessages.delMessages);
routes.delete('/messages/:chat_id', controllersMessages.delMessagesChat);

module.exports = routes;