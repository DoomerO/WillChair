const knex = require('../../database/database')

module.exports = {
    async searchMessages(req, res) { //Requisita todas as mensagens
        try {
            const result = await knex('Message');
            return res.status(201).json(result);
        } catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async searchMessagesChat(req, res) { //Requisita Mensagens pertencentes à um chat
        try {
            const {chat_id} = req.params;
            const result = await knex('Message').where('Chat_chat_id', chat_id);

            if(result != "") {
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "This chat does not exists"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async createMessages(req, res) { //Cria uma mensagem
        try {
            const {msg_content} = req.body;
            const {User_user_id} = req.body;
            const {Chat_chat_id} = req.body;

            if(await knex('User').where('user_id', User_user_id) != "" && 
            await knex('Chat').where('chat_id', Chat_chat_id) != "") {
                await knex('Message').insert({
                    msg_content,
                    User_user_id,
                    Chat_chat_id
                });
                return res.status(201).json({msg: "Message posted"})
            }
            else {
                return res.status(401).json({msg : 'There is no chat or user with these ids.'})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async delMessages(req, res) { //Deleta uma mensagem à partir do id
        try {
            const {id} = req.params;

            if (await knex('Message').where('msg_id', id) != '') {
                await knex('Message').del().where('msg_id', id);
                return res.status(201).json({msg: 'Message deleted'});
            }
            else {
                return res.status(401).json({msg: 'There is no such messages'});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async delMessagesChat(req, res) { //Deleta mensagens pertencentes a um chat específico
        try {
            const {chat_id} = req.params;

            if (await knex('Chat').where('chat_id', chat_id) != '') {
                await knex('Message').del().where('Chat_chat_id', chat_id);
                return res.status(201).json({msg: 'Message deleted'});
            }
            else {
                return res.status(401).json({msg: 'There is no such chat'});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    }
}