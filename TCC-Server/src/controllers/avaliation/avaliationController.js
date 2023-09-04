
const knex = require('../../database/database')

module.exports = {
    // Função para buscar todos os comentários
    async searchAvaliation(req, res) { 
        try {
            const result = await knex('Avaliation');
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchAvaliationReciver(req, res) {
        try {
            const {receiverId} = req.params;

            if(await knex("User").where("user_id", receiverId) != "") {
                const consult = await knex("Avaliation").where("User_user_idRec", receiverId).join("User", "User_user_idRec", "user_id");
                console.log(consult)
                const result = {
                    user_name : consult[0].user_name,
                    user_img : consult[0].user_img,
                    user_email : consult[0].user_email,
                    ava_content : consult[0].ava_content,
                    ava_date : consult[0].ava_date,
                    ava_content : consult[0].ava_content,
                    ava_id : consult[0].ava_id,
                    User_user_idEnv : consult[0].User_user_idEnv,
                    User_user_idRec : consult[0].User_user_idRec,
                }
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
    async createAvaliation(req,res) {
        try {
            const { ava_content, ava_value, User_user_idEnv, User_user_idRec } = req.body;
            const now = new Date();
            const ava_date =  now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();

            const userEnvExists = await knex("User").where('user_id', User_user_idEnv);
            const userRecExists = await knex("User").where('user_id', User_user_idRec);
            
            if (userEnvExists && userRecExists) {
                await knex('Avaliation').insert({
                    ava_content,
                    ava_date,
                    ava_value,
                    User_user_idEnv,
                    User_user_idRec
                });
                return res.status(201).json({msg : "Avaliação criada com sucesso."});
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
    async updateAvaliation(req, res) {
        try {
            const { id } = req.params;

            const { ava_content, ava_date, ava_value } = req.body;

            const commentExists = await knex("Avaliation").where("ava_id", id);
            if (commentExists) {
                await knex("Avaliation").update({
                    ava_content,
                    ava_value,
                    ava_date
                }).where('ava_id', id);
                return res.status(201).json({msg : "Avaliação atualizada com sucesso."});
            }
            else {
                return res.status(401).json({msg : "Avaliação não encontrada."});
            }
        }
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    // Função para excluir um comentário
    async deleteAvaliation(req, res) { 
        try {
            const { id } = req.params;

            const commentExists = await knex("Avaliation").where("ava_id", id);
            if (commentExists) {
                await knex("Avaliation").del().where("ava_id", id);
                return res.status(201).json({msg: "Avaliação excluída com sucesso."});
            }
            else {
                return res.status(401).json({msg: "Avaliação não encontrada."});
            }
            
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    }
}