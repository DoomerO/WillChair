const knex = require('../../database/database');
const bcrypt = require('bcrypt');

module.exports= {
    async searchUsers(req, res) {
        try {
            const result = await knex('User');
            res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async searchUserEmailPassword(req, res) {
        try {
            const {email} = req.params;
            const {password} = req.params;

            const consult = await knex('User').where("user_email", email);
        
            if (consultEmail != "") {
                bcrypt.compare(password, consult.user_password), function(err, result) {
                    if (err) {
                        return res.status(400).json({error: error.mesage});
                    }
                    if(result) {
                        return res.status(201).json({msg: "User Exists"});
                    }
                    else {
                        return res.status(400).json({msg: "There is no user with this informations"});
                    }
                } 
            }
            else {
                return res.status(400).json({msg: "There is no user with this informations"});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async createUser(req, res) {
        try {
            const {user_name} = req.body;
            const {user_email} = req.body;
            const {password} = req.body;
            const {user_level} = req.body;
            
            const user_password = bcrypt.hashSync(password, 10);
            
            const consult = await knex('User').where("user_email", user_email);

            if (consult != "") {
                return res.status(400).json({msg: "This user alredy exists"});
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
    }
}