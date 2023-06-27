const knex = require('../../database/database')

module.exports = {
    async searchOffers(req, res) { //recebe todas as ofertas no banco de dados
        try {
            const result = await knex('Offers');
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async createOffer(req, res) { //insere uma oferta no banco
        try {
            const {ofr_name} = req.body;
            const {ofr_desc} = req.body;
            const {ofr_value} = req.body;
            const {ofr_status} = req.body;
            const {ofr_postDate} = Date.now();
            const {User_user_id} = req.body;
            const {Product_prod_id} = req.body;

            const consult = await knex("User");

            if(consult != "") {
                consult = await knex('Product');
                if (consult == "") {
                    return res.status(401).json({msg:"This product does not exists in the database"});
                }
            }
            else {
                return res.status(401).json({msg:"This user does not exists in the database"});
            }

            await knex('Offer').insert({
                ofr_name,
                ofr_desc,
                ofr_postDate,
                ofr_status,
                ofr_value,
                User_user_id,
                Product_prod_id
            });
        }
        catch(error) {
            return res.status(400).json({error: error.mesage})
        }
    },
    
    async updateOffer(req, res) { //atualiza uma oferta pelo id
        try {
            const {id} = req.params
            const {ofr_name} = req.body;
            const {ofr_desc} = req.body;
            const {ofr_value} = req.body;
            const {ofr_status} = req.body;

            if(await knex("Offer").where("ofr_id", id) != "") {
                await knex("Offer").update({
                    ofr_desc,
                    ofr_name,
                    ofr_status,
                    ofr_value
                }).where('ofr_id', id);
            }
            else {
                return res.status(401).json({msg : "This offer does not exists"})
            }
            return res.status(201).json({msg : "This offer was properly updated"});
        }
        catch (error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async deleteOffer(req, res) { // deleta uma oferta pelo id
        try {
            const {id} = req.params;

            if(await knex("Offer").where("ofr_id", id) != ""){
                await knex("Offer").del().where("ofr_id", id);
                return res.status(201).json({msg: "Offer Deleted"});
            }
            else {
                return res.status(401).json({msg: "This offer is not registred"});
            }
            
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    }
}
