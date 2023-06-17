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
            const pass = await knex('User').select('user_password').where("user_email", email);
           
            if (consult != "") {
                const test = bcrypt.compare(password, pass, function(err, res) {
                    if (err) {
                        console.log(err)
                    }
                    if(res) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                if (test) {
                    return res.status(201).json({msg: "This user does exists" + pass})
                }
                else {
                    return res.status(401).json({msg: "There is no user with this informations"});
                }
            }
            else {
                return res.status(401).json({msg: "There is no user with this informations"});
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
    },

    async deleteUser(req, res) {
        try {
            const {cod} = req.params;
            await knex('User').del().where("user_id", cod);
            return res.status(201).json({msg: "User Deleted"});
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    }
}