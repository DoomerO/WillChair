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
routes.get('/users/login/:email/:password', controllersUsers.searchUserEmailPassword);
routes.get('/users/email/:email', auth, controllersUsers.searchUserEmail);
routes.post('/users', controllersUsers.createUser);
routes.put('/users/:email', auth,controllersUsers.updateUser);
routes.put('/users/password/:email', auth,controllersUsers.updateUserPassword);
routes.delete('/users/:id', auth,controllersUsers.deleteUser);

//Offer Routes
routes.get('/offers', auth, controllersOffers.searchOffers);
routes.get('/offers/user/:email', auth, controllersOffers.searchOffersUser);
routes.post('/offers', auth, controllersOffers.createOffer);
routes.put('/offers/:id', auth, controllersOffers.updateOffer);
routes.delete('/offers/:id', auth, controllersOffers.deleteOffer);

//Messages Routes
routes.get('/messages', auth, controllersMessages.searchMessages);
routes.get('/messages/chat/:chat_id', auth, controllersMessages.searchMessagesChat);
routes.post('/messages', auth, controllersMessages.createMessages);
routes.delete('/messages/:id', auth, controllersMessages.delMessages);
routes.delete('/messages/chat/:chat_id', auth, controllersMessages.delMessagesChat);

//Chat Routes 
routes.get('/chats', auth, controllersChats.searchChats);
routes.get('/chats/offer/:ofr_id', auth, controllersChats.searchChatOffer);
routes.post('/chats', auth, controllersChats.createChat);
routes.delete('/chats/:id', auth, controllersChats.deleteChat);
routes.delete('chats/offer/:ofr_id', auth, controllersChats.deleteChatOffer);

//Products Routes
routes.get('/products', auth, controllersProducts.searchProducts);
routes.get('/products/offer/:ofr_id', auth, controllersProducts.searchProductOffer);
routes.get('/products/id/:id', auth, controllersProducts.searchProductId);
routes.get('/products/types/:type', auth, controllersProducts.searchProductsTypes);
routes.post('/products', auth, controllersProducts.createProduct);
routes.post('/products/cadeira-rodas', auth, controllersProducts.createCadeiraRodas);
routes.post('/products/muleta', auth, controllersProducts.createMuleta);
routes.post('/products/bengala', auth, controllersProducts.createBengala);
routes.post('/products/andador', auth, controllersProducts.createAndador);
routes.put('/products/:id', auth, controllersProducts.updateProduct);
routes.put('/products/cadeira-rodas/:id', auth, controllersProducts.updateCadeiraRodas);
routes.put('/products/muleta/:id', auth, controllersProducts.updateMuleta);
routes.put('/products/bengala/:id', auth, controllersProducts.updateBengala);
routes.put('/products/andador/:id', auth, controllersProducts.updateAndador);
routes.delete('/products/:id', auth, controllersProducts.deleteProduct);

//avaliation routes

routes.get('/avaliation', auth, controllersavaliation.searchavaliation);
routes.post('/avaliation', auth, controllersavaliation.createavaliation);
routes.delete('/avaliation/:id', auth, controllersavaliation.deleteavaliation);

//denounce routes

routes.get('/denounce', auth, controllersdenounce.searchdenounce);
routes.get('/denounce/user/:email', auth, controllersdenounce.searchdenounceByEmail);
routes.post('/denounce', auth, controllersdenounce.createDenounce);
routes.put('/denounce/:id', auth, controllersdenounce.updateDenounce);
routes.delete('/denounce/:id', auth, controllersdenounce.deleteDenounce);

//comment routes

routes.get('/comment', auth, controllerscomment.searchcomment);
routes.post('/comment', auth, controllerscomment.createcomment);
routes.put('/comment/:id', auth, controllerscomment.updatecomment);
routes.delete('/comment/:id', auth, controllerscomment.deletecomment);


module.exports = routes;
