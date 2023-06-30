const knex = require('../../database/database');

module.exports = {
    async searchProducts(req, res) {
        try {
            const result = await knex('Product');
            return res.status(201).json({result});
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductOffer(req, res) {
        try {
            const {ofr_id} = req.body;

            const result = await knex('Offer').where('ofr_if', ofr_id);
            if(result != ""){
                const product = await knex('Product').where('prod_id', result[0].Product_prod_id);
                return res.status(201).json(product);
            }
            else {
                return res.status(401).json({msg : "There is no such offer with this id"})
            }
        }
        catch(error) {
            return  res.status(400).json({error : error.message});
        }
    },

    async createProduct(req, res) {
        try {
            const {prod_img} = req.body;
            const {prod_status} = req.body;
            const {prod_height} = req.body;
            const {prod_weight} = req.body;
            const {prod_type} = req.body;
            const {prod_composition} = req.body;

            await knex('Product').insert({
                prod_img,
                prod_height,
                prod_composition,
                prod_status,
                prod_type,
                prod_weight
            });
            return res.status(201).json({msg : 'The product was properly registred'});
        }
        catch(error) {
            return res.status(400).json({error : error. message});
        }
    },

    async updateProduct(req, res) {
        try {
            const {id} = req.body;
            const {prod_img} = req.body;
            const {prod_status} = req.body;
            const {prod_height} = req.body;
            const {prod_weight} = req.body;
            const {prod_type} = req.body;
            const {prod_composition} = req.body;

            if(await knex('Product').where('prod_id', id) != "") {
                await knex('Product').update({
                    prod_img,
                    prod_composition,
                    prod_height,
                    prod_status,
                    prod_type,
                    prod_weight
                }).where('prod_id', id);
                return res.status(201).json({msg : "Product Updated"});
            }
            else {
                return res.status(401).json({msg : "This Product does not exists"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async deleteProduct(req, res) {
        try {
            const {id} = req.params;
            if(await knex("Product").where('prod_id', id)) {
                await knex('Product').del().where('prod_id', id);
                return res.status(201).json({msg : "Product deleted with sucsses"});
            }
            else {
                return res.status(400).json({msg : "This product does not exists"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    }
}