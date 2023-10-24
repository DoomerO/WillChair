
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

    async searchAvaliatonBoth(req, res) {
        try {
            const {receiverId, senderId} = req.params;

            if(await knex("User").where("user_id", receiverId) != "" && await knex("User").where("user_id", senderId) != "") {
               const result = await knex("Avaliation").where("User_user_idRec", receiverId).where("User_user_idEnv", senderId);
               return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "Algum dos usuários não existe"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchAvaliationReciver(req, res) {
        try {
            const {receiverId} = req.params;

            if(await knex("User").where("user_id", receiverId) != "") {
                const consult = await knex("Avaliation").where("User_user_idRec", receiverId).join("User", "User_user_idEnv", "user_id");
                let result = [];
                for(let i = 0; i < consult.length; i++) {
                    result.push({
                        user_name : consult[i].user_name,
                        user_img : consult[i].user_img,
                        user_email : consult[i].user_email,
                        ava_content : consult[i].ava_content,
                        ava_date : consult[i].ava_date,
                        ava_content : consult[i].ava_content,
                        ava_id : consult[i].ava_id,
                        ava_value : consult[i].ava_value,
                        User_user_idEnv : consult[i].User_user_idEnv,
                        User_user_idRec : consult[i].User_user_idRec,
                    })
                }
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "Este usuário não existe"})
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
            const ava_date =  now;

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

                const points = await knex("Avaliation").where("User_user_idRec", User_user_idRec).select("ava_value");
                let newNota = ava_value;
                let sum = 0;

                if (points.length) for(let i = 0; i < points.length; i++) {
                    sum += points[i].ava_value;
                    if (i == points.length - 1) {
                        newNota = sum / points.length;
                    }
                }

                await knex("User").update({
                    user_nota : newNota
                }).where("user_id", userRecExists[0].user_id);

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

            const { ava_content, ava_value } = req.body;

            const commentExists = await knex("Avaliation").where("ava_id", id);
            if (commentExists) {
                await knex("Avaliation").update({
                    ava_content,
                    ava_value
                }).where('ava_id', id);

                const points = await knex("Avaliation").where("User_user_idRec", commentExists[0].User_user_idRec).select("ava_value");
                let newNota = ava_value;
                let sum = 0;

                if (points.length) for(let i = 0; i < points.length; i++) {
                    sum += points[i].ava_value;
                    if (i == points.length - 1) {
                        newNota = sum / points.length;
                    }
                }

                await knex("User").update({
                    user_nota : newNota
                }).where("user_id", commentExists[0].User_user_idRec);

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