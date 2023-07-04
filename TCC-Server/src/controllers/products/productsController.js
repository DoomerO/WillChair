const knex = require('../../database/database');

module.exports = {
    async searchProducts(req, res) {
        try {
            const result = await knex('Product');
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductsTypes(req, res) {
        try {
            const {type} = req.body;
            let result = null;
            if(type == "Cadeira de Rodas" || type  == "Muleta" || type == "Andador" || type == "Bengala") {
                result = await knex(type);
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg: "There is no such product type in the database"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductId(req, res) {
        try {
            const {id} = req.body;
            const consult = await knex('Product').where('prod_id',id);
            if(consult != "") {
                let productType = {case: null};

                switch(consult[0].prod_type) {
                    case "Cadeira de Rodas":
                        productType = await knex("Cadeira de Rodas").where('Product_prod_id', consult[0].prod_id);
                    break;
                    case "Andador":
                        productType = await knex("Andador").where('Product_prod_id', consult[0].prod_id);
                    break;
                    case "Muleta":
                        productType = await knex("Muleta").where('Product_prod_id', consult[0].prod_id);
                    break;
                    case "Bengala":
                        productType = await knex("Bengala").where('Product_prod_id', consult[0].prod_id);
                    break;
                }
                return res.status(201).json({product : consult[0], type: productType[0]});
            }
            else {
                return res.status(401).json({msg : "this product does not exists"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductOffer(req, res) {
        try {
            const {ofr_id} = req.body;

            const result = await knex('Offer').where('ofr_id', ofr_id);
            if(result != ""){
                const product = await knex('Product').where('prod_id', result[0].Product_prod_id);
                let productType = {case: null};

                switch(product[0].prod_type) {
                    case "Cadeira de Rodas":
                        productType = await knex("Cadeira de Rodas").where('Product_prod_id', product[0].prod_id);
                    break;
                    case "Andador":
                        productType = await knex("Andador").where('Product_prod_id', product[0].prod_id);
                    break;
                    case "Muleta":
                        productType = await knex("Muleta").where('Product_prod_id', product[0].prod_id);
                    break;
                    case "Bengala":
                        productType = await knex("Bengala").where('Product_prod_id', product[0].prod_id);
                    break;
                }

                return res.status(201).json({product : product[0], type: productType[0]});
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

    async createCadeiraRodas(req, res) {
        try {
            const {id} = req.body;

            const {cad_width} = req.body;
            const {cad_widthSeat} = req.body;
            const {cad_type} = req.body;
            const {cad_maxWeight} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Cadeira de Rodas") {
                    await knex('Cadeira de Rodas').insert({
                        cad_width,
                        cad_widthSeat,
                        cad_type,
                        cad_maxWeight,
                        Product_prod_id: id
                    });
                    return res.status(201).json({msg : "Product created as 'Cadeira de Rodas'"})
                }
                else {
                    return res.status(401).json({msg : "This product's type is not 'Cadeira de Rodas'"});
                }
            }
            else {
                return res.status(401).json({msg : "This product does not exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async createMuleta(req, res) {
        try {
            const {id} = req.body;

            const {mul_maxWidth} = req.body;
            const {mul_maxHeight} = req.body;
            const {mul_regulator}= req.body;
            const {mul_maxWeight} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Muleta") {
                    await knex('Muleta').insert({
                        mul_maxHeight,
                        mul_maxWeight,
                        mul_maxWidth,
                        mul_regulator,
                        Product_prod_id: id
                    });
                    return res.status(201).json({msg : "Product created as 'Muleta'"})
                }
                else {
                    return res.status(401).json({msg : "This product's type is not 'Muleta'"});
                }
            }
            else {
                return res.status(401).json({msg : "This product does not exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async createBengala(req, res) {
        try {
            const {id} = req.body;

            const {ben_minHeight} = req.body;
            const {ben_maxHeight} = req.body;
            const {ben_regulator}= req.body;
            const {ben_type} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Bengala") {
                    await knex('Bengala').insert({
                        ben_maxHeight,
                        ben_minHeight,
                        ben_regulator,
                        ben_type,
                        Product_prod_id: id
                    });
                    return res.status(201).json({msg : "Product created as 'Bengala'"})
                }
                else {
                    return res.status(401).json({msg : "This product's type is not 'Bengala'"});
                }
            }
            else {
                return res.status(401).json({msg : "This product does not exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },
    
    async createAndador(req, res) {
        try {
            const {id} = req.body;

            const {and_lenght} = req.body;
            const {and_width} = req.body;
            const {and_regulator}= req.body;
            const {and_maxHeigth} = req.body;
            const {and_minHeight} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Andador") {
                    await knex('Andador').insert({
                        and_lenght,
                        and_maxHeigth,
                        and_minHeight,
                        and_regulator,
                        and_width,
                        Product_prod_id: id
                    });
                    return res.status(201).json({msg : "Product created as 'Andador'"})
                }
                else {
                    return res.status(401).json({msg : "This product's type is not 'Andador'"});
                }
            }
            else {
                return res.status(401).json({msg : "This product does not exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
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

    async updateCadeiraRodas(req, res) {
        try {
            const {id} = req.body;

            const {cad_width} = req.body;
            const {cad_widthSeat} = req.body;
            const {cad_type} = req.body;
            const {cad_maxWeight} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Cadeira de Rodas") {
                    await knex('Cadeira de Rodas').update({
                        cad_width,
                        cad_widthSeat,
                        cad_type,
                        cad_maxWeight,
                        Product_prod_id: id
                    }).where("Product_prod_id", id);
                    return res.status(201).json({msg : "Product updated as 'Cadeira de Rodas'"})
                }
                else {
                    return res.status(401).json({msg : "This product's type is not 'Cadeira de Rodas'"});
                }
            }
            else {
                return res.status(401).json({msg : "This product does not exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async updateMuleta(req, res) {
        try {
            const {id} = req.body;

            const {mul_maxWidth} = req.body;
            const {mul_maxHeight} = req.body;
            const {mul_regulator}= req.body;
            const {mul_maxWeight} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Muleta") {
                    await knex('Muleta').update({
                        mul_maxHeight,
                        mul_maxWeight,
                        mul_maxWidth,
                        mul_regulator,
                        Product_prod_id: id
                    }).where('Product_prod_cod',id);
                    return res.status(201).json({msg : "Product updated as 'Muleta'"})
                }
                else {
                    return res.status(401).json({msg : "This product's type is not 'Muleta'"});
                }
            }
            else {
                return res.status(401).json({msg : "This product does not exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async updateBengala(req, res) {
        try {
            const {id} = req.body;

            const {ben_minHeight} = req.body;
            const {ben_maxHeight} = req.body;
            const {ben_regulator}= req.body;
            const {ben_type} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Bengala") {
                    await knex('Bengala').update({
                        ben_maxHeight,
                        ben_minHeight,
                        ben_regulator,
                        ben_type,
                        Product_prod_id: id
                    }).where('Product_prod_id', id);
                    return res.status(201).json({msg : "Product updated as 'Bengala'"})
                }
                else {
                    return res.status(401).json({msg : "This product's type is not 'Bengala'"});
                }
            }
            else {
                return res.status(401).json({msg : "This product does not exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async updateAndador(req, res) {
        try {
            const {id} = req.body;

            const {and_lenght} = req.body;
            const {and_width} = req.body;
            const {and_regulator}= req.body;
            const {and_maxHeigth} = req.body;
            const {and_minHeight} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Andador") {
                    await knex('Andador').update({
                        and_lenght,
                        and_maxHeigth,
                        and_minHeight,
                        and_regulator,
                        and_width,
                        Product_prod_id: id
                    }).where("Product_prod_id", id);
                    return res.status(201).json({msg : "Product updated as 'Andador'"})
                }
                else {
                    return res.status(401).json({msg : "This product's type is not 'Andador'"});
                }
            }
            else {
                return res.status(401).json({msg : "This product does not exists"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async deleteProduct(req, res) {
        try {
            const {id} = req.body;
            const product = await knex("Product").where('prod_id', id); 
            if(product != "") {
                switch(product[0].prod_type) {
                    case "Cadeira de Rodas":
                        await knex("Cadeira de Rodas").del().where('Product_prod_id', product[0].prod_id);
                    break;
                    case "Andador":
                        await knex("Andador").del().where('Product_prod_id', product[0].prod_id);
                    break;
                    case "Muleta":
                        await knex("Muleta").del().where('Product_prod_id', product[0].prod_id);
                    break;
                    case "Bengala":
                        await knex("Bengala").del().where('Product_prod_id', product[0].prod_id);
                    break;
                }
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