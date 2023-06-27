const knex = require('../../database/database');

module.exports = {

    async searchChats(req, res) { //Requisita todos os chats
        try {
            const result = await knex('Chat');
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },
    async searchChatOffer(req, res) { //Requisita chats pertencentes à uma oferta específica
        try {
            const {offer_id} = req.params;

            if(await knex('Offer').where('Offer_ofr_id', offer_id) != "") {
                const result = await knex('Chat').where('Offer_ofr_id', offer_id);
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : 'There is no offer corresponding to this id'})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async createChat(req, res) { //Cria um chat
        try {
            const {Offer_ofr_id} = req.body;
            if(await knex('Offer').where('ofr_id', Offer_ofr_id) != "") {
                await knex('Chat').insert({
                    Offer_ofr_id
                });
                return res.status(201).json({msg : "The Chat was properly created"});
            }
            else {
                return res.status(401).json({msg : "There is no such offer"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

   async deleteChat(req, res) { //Deleta um chat à partir do código
        try{
            const {id} = req.params;

            if (await knex('Chat').where('chat_id', id) != "") {
                await knex('Chat').del().where('chat_id', id);
            }
            else {
                return res.status(401).json({msg : "There is no chat with this id"});
            }
            return res.status(201).json({msg : "This chat was properly deleted"});
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
   },

   async deleteChatOffer(req, res) { //Deleta chats prtences à ofertas específicas
        try{
            const {ofr_id} = req.params;

            if (await knex('Offer').where('ofr_id', ofr_id) != "") {
                await knex('Chat').del().where('Offer_ofr_id', ofr_id);
            }
            else {
                return res.status(401).json({msg : "There is no offer with this id"});
            }
            return res.status(201).json({msg : "These chats was properly deleted"});
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
   }
}