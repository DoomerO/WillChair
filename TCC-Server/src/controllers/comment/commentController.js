
const knex = require('../../database/database')

module.exports = {
    // Função para buscar todos os comentários
    async searchcomment(req, res) { 
        try {
            const result = await knex('Comment');
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchCommentReciver(req, res) {
        try {
            const {receiverId} = req.params;

            if(await knex("User").where("user_id", receiverId) != "") {
                const result = await knex("Comment").where("User_user_idRec", receiverId)
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "This user does not Exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    // Função para criar um novo comentário
    async createcomment(req,res) {
        try {
            const { com_content, User_user_idEnv, User_user_idRec } = req.body;
            const now = new Date();
            const com_date =  now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();

            const userEnvExists = await knex("User").where('user_id', User_user_idEnv);
            const userRecExists = await knex("User").where('user_id', User_user_idRec);
            
            if (userEnvExists && userRecExists) {
                await knex('Comment').insert({
                    com_content,
                    com_date,
                    User_user_idEnv,
                    User_user_idRec
                });
                return res.status(201).json({msg : "Comentário criado com sucesso."});
            }
            else {
                return res.status(401).json({msg: "Usuário não encontrado."});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message})
        }
    },

    // Função para atualizar um comentário existente
    async updatecomment(req, res) {
        try {
            const { id } = req.params;

            const { com_content, com_date } = req.body;

            const commentExists = await knex("Comment").where("com_id", id);
            if (commentExists) {
                await knex("Comment").update({
                    com_content,
                    com_date
                }).where('com_id', id);
                return res.status(201).json({msg : "Comentário atualizado com sucesso."});
            }
            else {
                return res.status(401).json({msg : "Comentário não encontrado."});
            }
        }
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    // Função para excluir um comentário
    async deletecomment(req, res) { 
        try {
            const { id } = req.params;

            const commentExists = await knex("Comment").where("com_id", id);
            if (commentExists) {
                await knex("Comment").del().where("com_id", id);
                return res.status(201).json({msg: "Comentário excluído com sucesso."});
            }
            else {
                return res.status(401).json({msg: "Comentário não encontrado."});
            }
            
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    }
}