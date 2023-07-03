
const knex = require('../../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports= {
    async searchUsers(req, res) { //recebe todos os cadastros de usuário no sistema
        try {
            const result = await knex('User');
            res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async searchUserEmailPassword(req, res) { //Autentica um usuário existente
        try {
            const {email} = req.body;
            const {password} = req.body;
            const consult = await knex('User').where("user_email", email);
            if (consult != "") {
                const pass = consult[0].user_password.toString();
                bcrypt.compare(password, pass).then((result) => {
                    if(result) {
                        const user = {id: consult[0].user_id, name: consult[0].user_name, 
                            email: consult[0].user_email, level: consult[0].user_level};
                            
                            const acssesToken = jwt.sign( //criação de token
                                user,
                                process.env.TOKEN_KEY_ACSSES,
                            );

                            user["token"] = acssesToken;

                        return res.status(201).json(user)
                    }
                    else {
                        return res.status(401).json({msg: "There is no user with this informations1 " + pass + " " + password});
                    }
                }).catch((err) => {
                    return res.status(400).json({error: err.message})
                });
            }
            else {
                return res.status(401).json({msg: "There is no user with this informations"});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async createUser(req, res) { //cria um novo usuário no sistema
        try {
            const {user_name} = req.body;
            const {user_email} = req.body;
            const {password} = req.body;
            const {user_level} = req.body;
            
            if (!user_name || !user_email || user_level < 0 || !password) {
                return res.status(401).json({msg : "All data must be fullfiled"})
            }

            if (await knex('User').where("user_email", user_email) != "") {
                return res.status(401).json({msg: "This user alredy exists"});
            }
           
            const user_password = bcrypt.hashSync(password, 10);

            await knex('User').insert({
                user_name,
                user_email,
                user_level,
                user_password
            });
            
            const user = { name: user_name, level: user_level, email: user_email}
            
            const acssesToken = jwt.sign( //criação de token
                user,
                process.env.TOKEN_KEY_ACSSES,
            );

            user["token"] = acssesToken;

            return res.status(201).json(user);

        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async updateUser(req, res) { //atualiza parâmetros do usuário
        try {
            const {email} = req.body;

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
            return res.status(400).json({error: error.message});
        }
    },

    async updateUserPassword(req, res) { //Atualiza a senha do usuário
        try {
            const {email} = req.body;

            const {password} = req.body;

            if(!email || !password) {
                return res.status(401).json({msg : "All data must be fullfiled"})
            }

            if (await knex('User').where("user_email", email) != "") {
                const user_password = bcrypt.hashSync(password, 10);
                console.log(user_password)
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
            const {id} = req.body;
            if (await knex("User").where("user_id", id) != "") {
                await knex('User').del().where("user_id", id);
                return res.status(201).json({msg: "User Deleted"});
            }
            else {
                return res.status(401).json({msg: "This user is not registred"});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    }
}