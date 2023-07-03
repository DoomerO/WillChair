const knex = require('../../database/database')

module.exports = {
    // Função para buscar todas as avaliações
    async searchavaliation(req, res) { 
        try {
            const result = await knex('avaliation');
            return res.status(201).json(result);
        }
        catch(error) { 
            return res.status(400).json({error: error.message});
        }
    },


    // Função para criar uma nova avaliação
    async createavaliation(req,res) {
        try {
            const { ava_id, ava_value, ava_data, User_user_idEnv, User_user_idRec } = req.body;

            const userEnvExists = await knex("User").where('user_id', User_user_idEnv);
            const userRecExists = await knex("User").where('user_id', User_user_idRec);
            
            if (userEnvExists && userRecExists) {
                await knex('avaliation').insert({
                    ava_id,
                    ava_value,
                    ava_data,
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
            return res.status(400).json({error: error.message});
        }
    },


    // Função para excluir uma avaliação
    async deleteavaliation(req, res) { 
        try {
            const { id } = req.body;

            const avaliationExists = await knex("avaliation").where("ava_id", id);
            if (avaliationExists) {
                await knex("avaliation").del().where("ava_id", id);
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