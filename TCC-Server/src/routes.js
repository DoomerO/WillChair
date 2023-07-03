const express = require('express');

//middlewares
const auth = require('./middleware/auth');

//Controllers
const controllersUsers = require('./controllers/users/usersController');
const controllersOffers = require('./controllers/offers/offersController');
const controllersMessages = require('./controllers/messages/messagesController');
const controllersChats = require('./controllers/chats/chatsController');
const controllersProducts = require('./controllers/products/productsController');
const controllersavaliation = require('./controllers/avaliation/avaliationController');
const controllersdenounce = require('./controllers/denounce/denounceController');
const controllerscomment = require('./controllers/comment/commentController');

const routes = express.Router();

//User Routes
routes.get('/users', auth,controllersUsers.searchUsers);
routes.get('/users/login', controllersUsers.searchUserEmailPassword);
routes.get('/users/email', controllersUsers.searchUserEmail);
routes.post('/users', controllersUsers.createUser);
routes.put('/users', auth,controllersUsers.updateUser);
routes.put('/users/password', auth,controllersUsers.updateUserPassword);
routes.delete('/users', auth,controllersUsers.deleteUser);

//Offer Routes
routes.get('/offers', auth, controllersOffers.searchOffers);
routes.get('/offers/user', auth, controllersOffers.searchOffersUser);
routes.post('/offers', auth, controllersOffers.createOffer);
routes.put('/offers', auth, controllersOffers.updateOffer);
routes.delete('/offers', auth, controllersOffers.deleteOffer);

//Messages Routes
routes.get('/messages', auth, controllersMessages.searchMessages);
routes.get('/messages/chat', auth, controllersMessages.searchMessagesChat);
routes.post('/messages', auth, controllersMessages.createMessages);
routes.delete('/messages', auth, controllersMessages.delMessages);
routes.delete('/messages/chat', auth, controllersMessages.delMessagesChat);

//Chat Routes 
routes.get('/chats', auth, controllersChats.searchChats);
routes.get('/chats/offer', auth, controllersChats.searchChatOffer);
routes.post('/chats', auth, controllersChats.createChat);
routes.delete('/chats', auth, controllersChats.deleteChat);
routes.delete('chats/offer', auth, controllersChats.deleteChatOffer);

//Products Routes
routes.get('/products', auth, controllersProducts.searchProducts);
routes.get('/products/offer', auth, controllersProducts.searchProductOffer);
routes.post('/products', auth, controllersProducts.createProduct);
routes.put('/products', auth, controllersProducts.updateProduct);
routes.delete('/products', auth, controllersProducts.deleteProduct);

//avaliation routes

routes.get('/avaliation', auth, controllersavaliation.searchavaliation);
routes.post('/avaliation', auth, controllersavaliation.createavaliation);
routes.delete('/avaliation', auth, controllersavaliation.deleteavaliation);

//denounce routes

routes.get('/denounce', auth, controllersdenounce.searchdenounce);
routes.get('/denounce/user', auth, controllersdenounce.searchdenounceByEmail);
routes.post('/denounce', auth, controllersdenounce.createDenounce);
routes.put('/denounce', auth, controllersdenounce.updateDenounce);
routes.delete('/denounce', auth, controllersdenounce.deleteDenounce);

//comment routes

routes.get('/comment', auth, controllerscomment.searchcomment);
routes.post('/comment', auth, controllerscomment.createcomment);
routes.put('/comment', auth, controllerscomment.updatecomment);
routes.delete('/comment', auth, controllerscomment.deletecomment);


module.exports = routes;
