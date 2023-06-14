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

    async createUser(req, res) {
        try {
            const {user_name} = req.body;
            const {user_email} = req.body;
            const {password} = req.body;
            const {user_level} = req.body;
            
            const user_password = bcrypt.hashSync(password, 10);
            
            const consult = await knex('User').where("user_email", user_email);

            if (consult != "") {
                
                    return res.status(400).json({msg: "User Registred Properly"});
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