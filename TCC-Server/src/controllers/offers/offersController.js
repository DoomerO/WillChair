const knex = require('../../database/database')

module.exports = {
    async searchOffers(req, res) { //recebe todas as ofertas no banco de dados
        try {
            const result = await knex('Offer');
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async searchOffersUser(req, res) {
        try {
            const {email} = req.body;

            const consult  = await knex('User').where('user_email', email);
            if(consult != "") {
                const result = await knex('Offer').where('User_user_id', consult[0].user_id);
                return res.status(201).json(result);
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async createOffer(req, res) { //insere uma oferta no banco
        try {
            const {ofr_name} = req.body;
            const {ofr_desc} = req.body;
            const {ofr_value} = req.body;
            const {ofr_status} = req.body;
            const {ofr_type} = req.body;
            const {User_user_id} = req.body;
            const {Product_prod_id} = req.body;

            //const ofr_postDate = Date.now();

            if(await knex("User").where('user_id', User_user_id) != "") {
                if (await knex('Product').where('prod_id', Product_prod_id) != "") {
                    await knex('Offer').insert({
                        ofr_name,
                        ofr_desc,
                        //ofr_postDate,
                        ofr_status,
                        ofr_type,
                        ofr_value,
                        User_user_id,
                        Product_prod_id
                    });
                    return res.status(201).json({msg : "Offer properly registred"})
                }
                else {
                    return res.status(401).json({msg:"This product does not exists in the database"});
                }
            }
            else {
                return res.status(401).json({msg:"This user does not exists in the database"});
            } 
        }
        catch(error) {
            return res.status(400).json({error: error.message})
        }
    },
    
    async updateOffer(req, res) { //atualiza uma oferta pelo id
        try {
            const {id} = req.body;

            const {ofr_name} = req.body;
            const {ofr_desc} = req.body;
            const {ofr_value} = req.body;
            const {ofr_status} = req.body;
            const {ofr_type} = req.body;

            if(await knex("Offer").where("ofr_id", id) != "") {
                await knex("Offer").update({
                    ofr_desc,
                    ofr_name,
                    ofr_status,
                    ofr_type,
                    ofr_value
                }).where('ofr_id', id);
            }
            else {
                return res.status(401).json({msg : "This offer does not exists"})
            }
            return res.status(201).json({msg : "This offer was properly updated"});
        }
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async deleteOffer(req, res) { // deleta uma oferta pelo id
        try {
            const {id} = req.body;

            if(await knex("Offer").where("ofr_id", id) != ""){
                await knex("Offer").del().where("ofr_id", id);
                return res.status(201).json({msg: "Offer Deleted"});
            }
            else {
                return res.status(401).json({msg: "This offer is not registred"});
            }
            
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    }
}
