const knex = require('../../database/database');
const bcrypt = require('bcrypt');

module.exports= {
    async searchUsers(req, res) { //recebe todos os cadastros de usuário no sistema
        try {
            const result = await knex('User');
            res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async searchUserEmailPassword(req, res) { //Autentica um usuário existente
        try {
            const {email} = req.params;
            const {password} = req.params;

            const consult = await knex('User').where("user_email", email);
            
            const pass = await knex('User').where("user_email", email).select('user_password');
             
            if (consult != "") {
                bcrypt.compare(password, pass.toString()).then((result) => {
                    if(result) {
                        return res.status(201).json({msg: "This user does exists" })
                    }
                    else {
                        return res.status(401).json({msg: "There is no user with this informations" + pass.toString()});
                    }
                }).catch((err) => {
                    return res.status(400).json({error: err.mesage})
                });
            }
            else {
                return res.status(401).json({msg: "There is no user with this informations"});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async createUser(req, res) { //cria um novo usuário no sistema
        try {
            const {user_name} = req.body;
            const {user_email} = req.body;
            const {password} = req.body;
            const {user_level} = req.body;
            
            const user_password = bcrypt.hashSync(password, 10);
            
            if (await knex('User').where("user_email", user_email) != "") {
                return res.status(401).json({msg: "This user alredy exists"});
            }
           
            await knex('User').insert({
                user_name,
                user_email,
                user_level,
                user_password
            })
            return res.status(201).json({msg: "User Registred Properly"});
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async updateUser(req, res) { //atualiza parâmetros do usuário
        try {
            const {email} = req.params;
            const {user_name} = req.body;
            const {user_phone} = req.body;
            const {user_CEP} = req.body;
            const {user_houseNum} = req.body;
            const {user_img} = req.body;

            if (await knex('User').where("user_email", email) != "") {
                await knex("User").update({
                    user_name,
                    user_phone,
                    user_CEP,
                    user_houseNum,
                    user_img
                }).where('user_email', email);
            }
            else {
                return res.status(401).json({msg: "This User does not exists"});
            }
            return res.status(201).json({msg: "User Updated Properly"});
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async updateUserPassword(req, res) { //Atualiza a senha do usuário
        try {
            const {email} = req.params;
            const {password} = req.body;

            if (await knex('User').where("user_email", email) != "") {
                const user_password = bcrypt.hashSync(password, 10);

                await knex("User").update({
                   user_password
                }).where('user_email', email);
            }
            else {
                return res.status(401).json({msg: "This User does not exists"});
            }
            return res.status(201).json({msg: "Password of " + email + " Updated Properly"});
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async deleteUser(req, res) { //deleta um usuário  pelo id
        try {
            const {id} = req.params;
            if (await knex("User").where("user_id", id) != "") {
                await knex('User').del().where("user_id", id);
                return res.status(201).json({msg: "User Deleted"});
            }
            else {
                return res.status(401).json({msg: "This user is not registred"});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    }
}