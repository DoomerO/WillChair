
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

    async searchUserEmail(req, res) {
        try {
            const {email} = req.params;

            const consult = await knex('User').where('user_email', email);
            if(consult != "") {
                const result = {
                    user_id : consult[0].user_id,
                    user_name : consult[0].user_name,
                    user_CEP : consult[0].user_CEP,
                    user_city : consult[0].user_city,
                    user_level : consult[0].user_level,
                    user_houseNum : consult[0].user_houseNum,
                    user_phone : consult[0].user_phone,
                    user_img : consult[0].user_img,
                    user_email : consult[0].user_email
                }
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "Não á usuário com este email"})
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message})
        }
    },

    async searchUserId(req, res) {
        try {
            const {id} = req.params;

            const consult = await knex('User').where('user_id', id);
            if(consult != "") {
                const result = {
                    user_id : consult[0].user_id,
                    user_name : consult[0].user_name,
                    user_CEP : consult[0].user_CEP,
                    user_city : consult[0].user_city,
                    user_level : consult[0].user_level,
                    user_houseNum : consult[0].user_houseNum,
                    user_phone : consult[0].user_phone,
                    user_img : consult[0].user_img,
                    user_email : consult[0].user_email
                }
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "Não há usuário com este id"})
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message})
        }
    },

    async searchUserEmailPassword(req, res) { //Autentica um usuário existente
        try {
            const {email} = req.params;
            const {password} = req.params;
            const consult = await knex('User').where("user_email", email);
            if (consult != "") {
                const pass = consult[0].user_password.toString();
                bcrypt.compare(password, pass).then((result) => {
                    if(result) {
                        const user = {name: consult[0].user_name, 
                            email: consult[0].user_email, level: consult[0].user_level};
                            
                            const acssesToken = jwt.sign( //criação de token
                                user,
                                process.env.TOKEN_KEY_ACSSES,
                                {expiresIn: '3h'}
                            );

                        return res.status(201).json({token : acssesToken})
                    }
                    else {
                        return res.status(401).json({msg: "Não há usuários com estes dados " + pass + " " + password});
                    }
                }).catch((err) => {
                    return res.status(400).json({error: err.message})
                });
            }
            else {
                return res.status(401).json({msg: "Não há usuários com estes dados"});
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
                return res.status(401).json({msg : "Todos os campos devem ser preenchidos"})
            }

            if (await knex('User').where("user_email", user_email) != "") {
                return res.status(401).json({msg: "Esse email já está em uso"});
            }
           
            const user_password = bcrypt.hashSync(password, 10);

            await knex('User').insert({
                user_name,
                user_email,
                user_level,
                user_password
            });
            
            const user = {name: user_name, email: user_email, level: user_level}
            
            const acssesToken = jwt.sign( //criação de token
                user,
                process.env.TOKEN_KEY_ACSSES,
                {expiresIn: '3h'}
            );

            return res.status(201).json({token : acssesToken});

        }
        catch(error) {
            return res.status(400).json({error: error.message});
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
            const {user_city} = req.body;

            if (await knex('User').where("user_email", email) != "") {
                await knex("User").update({
                    user_name,
                    user_phone,
                    user_CEP,
                    user_houseNum,
                    user_city,
                    user_img
                }).where('user_email', email);
            }
            else {
                return res.status(401).json({msg: "Esse usuário não existe"});
            }
            return res.status(201).json({msg: "Usuário atualizado!"});
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async updateUserPassword(req, res) { //Atualiza a senha do usuário
        try {
            const {email} = req.params;

            const {password} = req.body;

            if(!email || !password) {
                return res.status(401).json({msg : "Todos os campos devem ser ppreenchidos"})
            }

            if (await knex('User').where("user_email", email) != "") {
                const user_password = bcrypt.hashSync(password, 10);
                console.log(user_password)
                await knex("User").update({
                   user_password
                }).where('user_email', email);
            }
            else {
                return res.status(401).json({msg: "Esse usuário não existe"});
            }
            return res.status(201).json({msg: "Senha de " + email + " atualizada!"});
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
                return res.status(201).json({msg: "Usuário deletado"});
            }
            else {
                return res.status(401).json({msg: "Este usuário nao está registrado"});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    }
}
