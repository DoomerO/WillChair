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
routes.put('/users/:email', auth,controllersUsers.updateUser);
routes.put('/usersPassword/:email', auth,controllersUsers.updateUserPassword);
routes.delete('/users/:id', auth,controllersUsers.deleteUser);

//Offer Routes
routes.get('/offers', auth, controllersOffers.searchOffers);
routes.get('/offers/:email', auth, controllersOffers.searchOffersUser);
routes.post('/offers', auth, controllersOffers.createOffer);
routes.put('/offers/:id', auth, controllersOffers.updateOffer);
routes.delete('/offers/:id', auth, controllersOffers.deleteOffer);

//Messages Routes
routes.get('/messages', auth, controllersMessages.searchMessages);
routes.get('/messages/:chat_id', auth, controllersMessages.searchMessagesChat);
routes.post('/messages', auth, controllersMessages.createMessages);
routes.delete('/messages/:id', auth, controllersMessages.delMessages);
routes.delete('/messages/:chat_id', auth, controllersMessages.delMessagesChat);

//Chat Routes 
routes.get('/chats', auth, controllersChats.searchChats);
routes.get('/chats/:ofr_id', auth, controllersChats.searchChatOffer);
routes.post('/chats', auth, controllersChats.createChat);
routes.delete('/chats/:id', auth, controllersChats.deleteChat);
routes.delete('chats/:ofr_id', auth, controllersChats.deleteChatOffer);

module.exports = routes;