const express = require('express');

//middlewares
const auth = require('./middleware/auth');

//Controllers
const controllersUsers = require('./controllers/users/usersController');
const controllersOffers = require('./controllers/offers/offersController');
const controllersMessages = require('./controllers/messages/messagesController');
const controllersChats = require('./controllers/chats/chatsController');

const routes = express.Router();

//User Routes
routes.get('/users', auth,controllersUsers.searchUsers);
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
routes.get('/messages', controllersMessages.searchMessages);
routes.get('/messages/:chat_id', controllersMessages.searchMessagesChat);
routes.post('/messages', controllersMessages.createMessages);
routes.delete('/messages/:id', controllersMessages.delMessages);
routes.delete('/messages/:chat_id', controllersMessages.delMessagesChat);

//Chat Routes 
routes.get('/chats', controllersChats.searchChats);
routes.get('/chats/:ofr_id', controllersChats.searchChatOffer);
routes.post('/chats', controllersChats.createChat);
routes.delete('/chats/:id', controllersChats.deleteChat);
routes.delete('chats/:ofr_id', controllersChats.deleteChatOffer);

module.exports = routes;