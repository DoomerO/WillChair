const knex = require('../../database/database')

module.exports = {
    async searchOffers(req, res) { //recebe todas as ofertas no banco de dados
        try {
            const result = await knex('Offer').join("Product", "product_prod_id", "prod_id");
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async searchOffersUser(req, res) { //recebe todas as ofertas de determinado usuário
        try {
            const {email} = req.params;

            const consult  = await knex('User').where('user_email', email);
            if(consult != "") {
                const result = await knex('Offer').where('User_user_id', consult[0].user_id).join("Product", "Product_prod_id", "prod_id");
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json("There is no user with this email");
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async searchOfferId(req, res) { //recebe todas as ofertas de determinado usuário
        try {
            const {id} = req.params;

            const consult  = await knex('Offer').where('ofr_id', id);
            if(consult != "") {
                const result = await knex('Offer').where('ofr_id', consult[0].ofr_id).join("Product", "Product_prod_id", "prod_id");
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json("There is no offer with this id");
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async searchOffersAtributes(req, res) { //Pesquisa a oferta por atributos
        try {
            const {atribute, value} = req.params;
            let consult;
            switch (atribute) {
                case "user_city":
                    consult = await knex("Offer").where("ofr_city", "like", `%${value}%`).join("Product", "Product_prod_id", "prod_id");
                    if(!consult){
                        return res.status(401).json('There is no offer like this.');
                    }
                    return res.status(201).json(consult);

                case "ofr_type":
                    consult = await knex("Offer").where("ofr_type", "like", `%${value}%`).join("Product", "Product_prod_id", "prod_id");
                    if(!consult){
                        return res.status(401).json('There is no offer like this.');
                    }
                    return res.status(201).json(consult);

                case "prod_type":
                    if (value == "others") {
                        consult = await knex("Product").join("Offer", "prod_id", "Product_prod_id").where("prod_type", "not like", "%Cadeira de Rodas%")
                        .where("prod_type", "not like", "%Bengala%").where("prod_type", "not like", "%Andador%").where("prod_type", "not like", "%Muleta%");    
                    }
                    else {
                        consult = await knex("Product").join("Offer", "prod_id", "Product_prod_id").where("prod_type", "like", `%${value}%`);
                    }
                    if(!consult){
                        return res.status(401).json('There is no offer like this.');
                    }
                    return res.status(201).json(consult);

                case "name":
                    consult = await knex("Offer").where("ofr_name", "like", `%${value}%`).join("Product", "Product_prod_id", "prod_id");
                    if(!consult){
                        return res.status(401).json('There is no offer like this.');
                    }
                    return res.status(201).json(consult);

                case "prod_composition":
                    consult = await knex("Product").join("Offer", "prod_id", "Product_prod_id").where("prod_composition", "like", `%${value}%`);
                    if(!consult){
                        return res.status(401).json('There is no offer like this.');
                    }
                    return res.status(201).json(consult);

                case "user_name":
                    consult = await knex("Offer").where("ofr_user_name", "like", `%${value}%`).join("Product", "Product_prod_id", "prod_id");
                    if(!consult){
                        return res.status(401).json('There is no offer like this.');
                    }
                    return res.status(201).json(consult);

                default:
                    return res.status(401).json({msg : "There is no query atribute like this"});
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
            const {ofr_parcelas} = req.body;
            const {User_user_id} = req.body;
            const {Product_prod_id} = req.body;

            const now = new Date();
            const ofr_postDate =  now;

            const user = await knex("User").where('user_id', User_user_id);

            if(user != "") {
                const ofr_city = user[0].user_city;
                const ofr_user_name = user[0].user_name;
                if (await knex('Product').where('prod_id', Product_prod_id) != "") {
                    await knex('Offer').insert({
                        ofr_name,
                        ofr_desc,
                        ofr_postDate,
                        ofr_status,
                        ofr_type,
                        ofr_value,
                        ofr_city,
                        ofr_user_name,
                        ofr_parcelas,
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
            const {id} = req.params;

            const {ofr_name} = req.body;
            const {ofr_desc} = req.body;
            const {ofr_value} = req.body;
            const {ofr_type} = req.body;
            const {ofr_parcelas} = req.body;

            if(await knex("Offer").where("ofr_id", id) != "") {
                await knex("Offer").update({
                    ofr_desc,
                    ofr_name,
                    ofr_type,
                    ofr_value,
                    ofr_parcelas
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

    async removeIntrest(req, res) {
        try {
            const {id} = req.params;

            if(await knex("Offer").where("ofr_id", id) != "") {
                await knex("Offer").update({
                    ofr_status : "Livre",
                    user_comp_id : null
                }).where('ofr_id', id);
                return res.status(201).json({msg : "Intrested removed properly"});
            }
            return res.status(401).json({msg : "This offer does not exists"})
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async confirmEquipOprt(req, res) {
        try {
            const {user} = req.params;
            const {id} = req.params;

            if(await knex("Offer").where("ofr_id", id) != "") {
                if (user == "Env") {
                    await knex("Offer").update({
                        ofr_status : "Conclusão",
                        ofr_env_conf : 1
                    }).where('ofr_id', id);
                    return res.status(201).json({msg : "Product sended"});
                }
                else {
                    await knex("Offer").update({
                        ofr_status : "Conclusão",
                        ofr_rec_conf : 1
                    }).where('ofr_id', id);
                    return res.status(201).json({msg : "Product recieved"});
                }
            }
            return res.status(401).json({msg : "This offer does not exists"})
        }
        catch(error) {
            return res.status(400).json({error: error.message});
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
            return res.status(400).json({error: error.message});
        }
    }
}
