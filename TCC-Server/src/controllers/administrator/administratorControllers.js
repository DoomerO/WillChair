const knex = require("../../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async searchAdministrators(req, res) {
        try {
            const consult  = await knex("Administrator");
            let result = [];
            for(let i = 0; i < consult.length; i++) {
                result.push({
                    adm_name : consult[i].adm_name,
                    adm_email : consult[i].adm_email,
                    adm_level : consult[i].adm_level,
                    adm_id : consult[i].adm_id
                })
            }
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }        
    },

    async searchAdmEmail(req, res) {
        try {
            const {email, mode} = req.params;

            const consult = await knex("Administrator").where("adm_email", email);
            
            if(consult != "") {
                switch(mode) {
                    case "validation":
                        return res.status(201).json({msg : "Este administrador existe"});
                    
                    case "get":
                        return res.status(201).json(consult);
                }
            }
            else {
                return res.status(401).json({msg : "Este administrador não existe"});
            }
        }
        catch (error) {
            res.status(400).json({error : error.message});
        }
    },

    async verifyAdministrator(req, res) {
        try {
            const {password, email} = req.params;

            const consult = await knex("Administrator").where("adm_email", email);

            if(consult != "") {
                const pass = consult[0].adm_password.toString();
                bcrypt.compare(password, pass).then((result) => {
                    if(result) {
                        const adm = {email : consult[0].adm_email, name: consult[0].adm_name, level: consult[0].adm_level}

                        const validationToken = jwt.sign(
                            adm,
                            process.env.TOKEN_KEY_ADM,
                            {expiresIn : "1h"}
                        )

                        return res.status(201).json({token : validationToken});
                    }

                    return res.status(401).json({msg : "Não há um administrador com estes dados"})
                }).catch((error) => {
                    return res.status(400).json({error : error.message})
                })

            }
            else return res.status(401).json({msg : "Não há um administrador com estes dados"})
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async getAdmId(req, res) {
        try {
            const {email} = req.params;
    
            const result = await knex("Administrator").where("adm_email", email).select("adm_id");
    
            if(result != "") return res.status(201).json(result);
            return res.status(401).json({msg : "Não existe um administrador com este e-mail"})
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async createAdministrator(req, res) {
        try {
            const { password, adm_name, adm_email, adm_level } = req.body;

            if(!password || !adm_email || !adm_name || !adm_level ) return res.status(401).json({msg : "Todos os camps devem ser preenchidos"});

            if(await knex("Administrator").where("adm_email", adm_email) != "") {
                return res.status(401).json({msg : "Este administrador já foi registrado"});
            }

            const adm_password = bcrypt.hashSync(password, 10);

            await knex("Administrator").insert({
                adm_name,
                adm_password,
                adm_level,
                adm_email
            })
            
            const adm = { email : adm_email, name : adm_name, level : adm_level};

            const validationToken = jwt.sign(
                adm, 
                process.env.TOKEN_KEY_ADM,
                {expiresIn :  "1h"}
            );

            return res.status(201).json({token : validationToken});
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }        
    },

    async updateAdministrator(req, res) {
        try {
            const { updtType, id } = req.params;
            const { adm_name, adm_email, password, adm_level } = req.body;

            const consult = await knex("Administrator").where("adm_id", id);
            if(consult == "") return res.status(401).json({msg : "Este administrador não existe"});

            let adm = { email : consult[0].adm_email, name : consult[0].adm_name, level : consult[0].adm_level};

            switch (updtType) {
                case "password":
                    const adm_password = bcrypt.hashSync(password, 10);

                    await knex("Administrator").update({
                        adm_password
                    }).where("adm_id", id);
                break;
                case "email":
                    if(await knex("Administrator").where("adm_email", adm_email) != "") return res.status(401).json({msg : "Este e-mail já foi registrado"})

                    await knex("Administrator").update({
                        adm_email
                    }).where("adm_id", id);

                    adm.email = adm_email;
                break;
                case "name":
                    await knex("Administrator").update({
                        adm_name
                    }).where("adm_id", id);

                    adm.name = adm_name;
                break;
                case "level": 
                    await knex("Administrator").update({
                        adm_level
                    }).where("adm_id", id);

                    adm.level = adm_level;
                break;
            }

            const validationToken = jwt.sign(
                adm, 
                process.env.TOKEN_KEY_ADM,
                {expiresIn :  "1h"}
            );

            return res.status(201).json({token : validationToken})
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }        
    },

    async setResponsability(req, res) {
        try {
            const {den_id} = req.params;
            const {adm_id} = req.params;

            const consult = await knex("Denounce").where("den_id", den_id);

            if (consult != "") {
                await knex("Denounce").update({
                    adm_assigned : adm_id,
                    den_status : "Em avaliação"
                }).where("den_id", den_id);
                return res.status(201).json({msg : "Responsabilidade definida"});
            }

            return res.status(401).json({msg : "Essa denúncia não existe"});   

        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async reduceUserPoints(req, res) {
        try {
            const {user_id} = req.params;

            const consult = await knex("User").where("user_id", user_id);
            if (consult != "") {
                await knex("User").update({
                    user_nota : consult[0].user_nota - 1
                }).where("user_id", user_id);
                return res.status(201).json({msg : "Pontos reduzidos"});
            }

            return res.status(401).json({msg : "Este usuário não existe"});   
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async deleteAdministrator(req, res) {
        try {
            const {email} = req.params;
            if(await knex("Administrator").where("adm_email", email) != "") {
                await knex("Administrator").del().where("adm_email", email);
                return res.status(201).json({msg : "Este administrador foi deletado"});
            }
            return res.status(401).json({msg : "Este usuário não existe"});
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }            
    }
}