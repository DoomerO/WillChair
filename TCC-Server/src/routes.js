const express = require('express');

//middlewares
const auth = require('./middleware/auth');
const authAdm = require('./middleware/authAdm');
const authAdm2 = require('./middleware/authAdm2');
const authAdm3 = require('./middleware/authAdm3');

//Controllers
const controllersUsers = require('./controllers/users/usersController');
const controllersOffers = require('./controllers/offers/offersController');
const controllersMessages = require('./controllers/messages/messagesController');
const controllersChats = require('./controllers/chats/chatsController');
const controllersProducts = require('./controllers/products/productsController');
const controllersdenounce = require('./controllers/denounce/denounceController');
const controllersAvaliation = require('./controllers/avaliation/avaliationController');
const controllersAdministration = require('./controllers/administrator/administratorControllers');

const routes = express.Router();

//User Routes
routes.get('/users', authAdm, controllersUsers.searchUsers);
routes.get('/users/login/:email/:password', controllersUsers.searchUserEmailPassword);
routes.get('/users/email/:email', auth, controllersUsers.searchUserEmail);
routes.get('/users/id/:id', controllersUsers.searchUserId);
routes.get('/users/profile/:email', controllersUsers.searchUserEmail);
routes.post('/users', controllersUsers.createUser);
routes.put('/users/:email', auth, controllersUsers.updateUser);
routes.put('/users/password/:email', auth, controllersUsers.updateUserPassword);
routes.put('/users/email/:id', auth, controllersUsers.updateUserEmail);
routes.delete('/users/:id', auth, controllersUsers.deleteUser);
routes.delete('/users/adm/:id', authAdm, controllersUsers.deleteUser);

//Email Routes


//User Images Routes
routes.get('/users/profile/photo/:filename', controllersUsers.returnImage);
routes.put('/users/profile/photo', auth, controllersUsers.uploadImg);

//Offer Routes
routes.get('/offers', controllersOffers.searchOffers);
routes.get('/offers/user/:email', controllersOffers.searchOffersUser);
routes.get('/offers/query/:atribute/:value', controllersOffers.searchOffersAtributes);
routes.get('/offers/id/:id', controllersOffers.searchOfferId);
routes.post('/offers', auth, controllersOffers.createOffer);
routes.put('/offers/:id', auth, controllersOffers.updateOffer);
routes.put('/offers/remove-intrest/:id', auth, controllersOffers.removeIntrest);
routes.put('/offers/confirm-equipament/:id/:user', auth, controllersOffers.confirmEquipOprt);
routes.delete('/offers/:id', auth, controllersOffers.deleteOffer);
routes.delete('/offers/adm/:id', authAdm, controllersOffers.deleteOffer);

//Messages Routes
routes.get('/messages', authAdm, controllersMessages.searchMessages);
routes.get('/messages/chat/:chat_id', auth, controllersMessages.searchMessagesChat);
routes.get('/messages/chat/adm/:chat_id', authAdm, controllersMessages.searchMessagesChat);
routes.post('/messages', auth, controllersMessages.createMessages);
routes.delete('/messages/:id', auth, controllersMessages.delMessages);
routes.delete('/messages/chat/:chat_id', auth, controllersMessages.delMessagesChat);

//Chat Routes 
routes.get('/chats', authAdm, controllersChats.searchChats);
routes.get('/chats/offer/:ofr_id', auth, controllersChats.searchChatOffer);
routes.get('/chats/offer/adm/:ofr_id', authAdm, controllersChats.searchChatOffer);
routes.get('/chats/user/offer/:user_id/:ofr_id', auth, controllersChats.searchChatUserOffer);
routes.get('/chats/user/:user_id', auth, controllersChats.searchChatUser);
routes.post('/chats', auth, controllersChats.createChat);
routes.delete('/chats/:id', auth, controllersChats.deleteChat);
routes.delete('/chats/offer/:ofr_id', auth, controllersChats.deleteChatOffer);
routes.delete('/chats/offer/adm/:ofr_id', authAdm, controllersChats.deleteChatOffer);

//Products Routes
routes.get('/products', authAdm, controllersProducts.searchProducts);
routes.get('/products/keys', auth, controllersProducts.searchKeysProducts);
routes.get('/products/offer/:ofr_id', controllersProducts.searchProductOffer);
routes.get('/products/id/:id', controllersProducts.searchProductId);
routes.get('/products/types/:type', authAdm, controllersProducts.searchProductsTypes);
routes.get('/products/typeQuery/:type/:id', authAdm, controllersProducts.searchProductsTypesId);
routes.get('/products/key/:key', auth, controllersProducts.searchProductKey);
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
routes.delete('/products/adm/:id', authAdm, controllersProducts.deleteProduct);

//Products Images Routes
routes.get('/products/photo/:filename', controllersProducts.returnImage);
routes.put('/products/img/photo', auth, controllersProducts.uploadImage);

//denounce routes
routes.get('/denounce', authAdm, controllersdenounce.searchdenounce);
routes.get('/denounce/user/:email', controllersdenounce.searchdenounceByEmail);
routes.get('/denounce/adm/:email', authAdm, controllersdenounce.searchdenounceByEmailAdm);
routes.get('/denounce/offer/:ofrId', controllersdenounce.searchDenounceOffer);
routes.get('/denounce/id/:id', authAdm, controllersdenounce.searchDenounceById);
routes.post('/denounce', auth, controllersdenounce.createDenounce);
routes.put('/denounce/:id', auth, controllersdenounce.updateDenounce);
routes.delete('/denounce/:id', authAdm, controllersdenounce.deleteDenounce);

//avaliation routes
routes.get('/avaliation', auth, controllersAvaliation.searchAvaliation);
routes.get('/avaliation/receiver/:receiverId', controllersAvaliation.searchAvaliationReciver);
routes.get('/avaliation/both/:receiverId/:senderId', auth, controllersAvaliation.searchAvaliatonBoth);
routes.post('/avaliation', auth, controllersAvaliation.createAvaliation);
routes.put('/avaliation/:id', auth, controllersAvaliation.updateAvaliation);
routes.delete('/avaliation/:id', auth, controllersAvaliation.deleteAvaliation);

//administration routes
routes.get('/adm', authAdm, controllersAdministration.searchAdministrators);
routes.get('/adm/email/:mode/:email', authAdm, controllersAdministration.searchAdmEmail);
routes.get('/adm/login/:email/:password', controllersAdministration.verifyAdministrator);
routes.get('/adm/id/:email', authAdm, controllersAdministration.getAdmId);
routes.post('/adm', authAdm2, controllersAdministration.createAdministrator);
routes.put('/adm/update/:updtType/:id', authAdm3, controllersAdministration.updateAdministrator);
routes.put('/adm/responsability/:den_id/:adm_id', authAdm2, controllersAdministration.setResponsability);
routes.put('/adm/reduce/points/:user_id', authAdm, controllersAdministration.reduceUserPoints);
routes.delete('/adm/:email', authAdm3, controllersAdministration.deleteAdministrator);

module.exports = routes;
