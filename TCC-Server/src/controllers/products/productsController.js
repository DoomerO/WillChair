const knex = require('../../database/database');

const path = require("path");
const fs = require('fs');

//multer
const multer = require('multer');
const storageProduct = multer.diskStorage({
    destination : "./prodImg",
    filename : function (req, file, cb) {
        const fileName = "dummy" + path.extname(file.originalname);
        cb(null, fileName);
    }
})
const uploadProd = multer({storage : storageProduct});

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

    async searchKeysProducts(req, res) {
        try {
            const result = await knex('Product').select("prod_key");

            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductsTypes(req, res) {
        try {
            const {type} = req.params;
            let result = null;
            if(type == "Cadeira de Rodas" || type  == "Muleta" || type == "Andador" || type == "Bengala") {
                result = await knex(type);
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg: "Este tipo de produto não existe"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductsTypesId(req, res) {
        try {
            const {type, id} = req.params;
            let result = null;
            if(type == "Cadeira de Rodas" || type  == "Muleta" || type == "Andador" || type == "Bengala") {
                result = await knex(type).where("Product_prod_id", id);
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg: "Este tipo de produto não existe"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductKey(req, res) {
        try {
            const {key} = req.params;
            const result = await knex("Product").where("prod_key", key);
            return res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductId(req, res) {
        try {
            const {id} = req.params;
            const consult = await knex('Product').where('prod_id',id);
            let result = consult;
            if(consult != "") {
                switch(consult[0].prod_type) {
                    case "Cadeira de Rodas":
                        result = await knex("Cadeira de Rodas").where("Product_prod_id", id).join("Product", "Product_prod_id", "prod_id");
                    break;
                    case "Andador":
                        result = await knex("Andador").where("Product_prod_id", id).join("Product", "Product_prod_id", "prod_id");
                    break;
                    case "Muleta":
                        result = await knex("Muleta").where("Product_prod_id", id).join("Product", "Product_prod_id", "prod_id");
                    break;
                    case "Bengala":
                        result = await knex("Bengala").where("Product_prod_id", id).join("Product", "Product_prod_id", "prod_id");
                    break;
                }
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async searchProductOffer(req, res) {
        try {
            const {ofr_id} = req.params;
           
            const consult = await knex('Offer').where('ofr_id', ofr_id);
            let result = consult;

            if(consult != ""){
                
                const product = await knex('Product').where('prod_id', result[0].Product_prod_id);
                result = product;

                switch(product[0].prod_type) {
                    case "Cadeira de Rodas":
                        result = await knex("Cadeira de Rodas").where("Product_prod_id", product[0].prod_id).join("Product", "Product_prod_id", "prod_id");
                    break;
                    case "Andador":
                        result = await knex("Andador").where("Product_prod_id", product[0].prod_id).join("Product", "Product_prod_id", "prod_id");
                    break;
                    case "Muleta":
                        result = await knex("Muleta").where("Product_prod_id", product[0].prod_id).join("Product", "Product_prod_id", "prod_id");
                    break;
                    case "Bengala":
                        result = await knex("Bengala").where("Product_prod_id", product[0].prod_id).join("Product", "Product_prod_id", "prod_id");
                    break;
                }

                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "Não existe uma oferta com este identificador"})
            }
        }
        catch(error) {
            return  res.status(400).json({error : error.message});
        }
    },
    
    async uploadImage(req, res) {
        try {
            const id = req.headers['prod_id'];
            uploadProd.single("photo")(req, res, async function(error) {
                if (error instanceof multer.MulterError) {
                    return res.status(400).json({error : error.message})
                  } else if (error) {
                    return res.status(500).json({error : error.message})
                  }

                  if (!req.file) {
                    return res.status(400).json({error: 'Nenhum arquivo provido'});
                  }
    
                  fs.renameSync(req.file.path, req.file.path.replace('dummy', `prod${id}`));
                try {
                    await knex("Product").update({
                        prod_img : `prod${id}${path.extname(req.file.originalname)}`
                    }).where("prod_id", id);
          
                    return res.status(201).json({msg : "Imagem enviada"});
                }
                catch(error) {
                    return res.status(400).json({error: error.message});
                }
            })
        }
        catch(error) {
            res.status(400).json({error : error});
        }
    },

    async returnImage(req, res) {
        const {filename} = req.params;

        const imagePath = path.resolve(__dirname, '..', '..', '..', 'prodImg', filename);

        fs.readFile(imagePath, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Error in image reading' });
            }

            res.setHeader('contentType',`image/${path.extname(filename)}`);

            res.end(data);
        });
    },

    async createProduct(req, res) {
        try {
            const {prod_status} = req.body;
            const {prod_height} = req.body;
            const {prod_weight} = req.body;
            const {prod_type} = req.body;
            const {prod_composition} = req.body;
            const {prod_key} = req.body;

            if(await knex("Product").where("prod_key", prod_key) != "") {
                return res.status(401).json({msg: "Já existe um produto com este código"});
            }

            await knex('Product').insert({
                prod_height,
                prod_composition,
                prod_status,
                prod_type,
                prod_weight,
                prod_key
            });
            return res.status(201).json({msg : 'rduto registrado'});
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
                    return res.status(201).json({msg : "Produto criado como 'Cadeira de Rodas'"})
                }
                else {
                    return res.status(401).json({msg : "O tipo do produto não é 'Cadeira de Rodas'"});
                }
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async createMuleta(req, res) {
        try {
            const {id} = req.body;

            const {mul_minHeight} = req.body;
            const {mul_maxHeight} = req.body;
            const {mul_regulator}= req.body;
            const {mul_maxWeight} = req.body;
            const {mul_type} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Muleta") {
                    await knex('Muleta').insert({
                        mul_maxHeight,
                        mul_maxWeight,
                        mul_minHeight,
                        mul_type,
                        mul_regulator,
                        Product_prod_id: id
                    });
                    return res.status(201).json({msg : "Produto criado como 'Muleta'"})
                }
                else {
                    return res.status(401).json({msg : "O tipo do produto não é 'Muleta'"});
                }
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"})
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
            const {ben_color} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Bengala") {
                    await knex('Bengala').insert({
                        ben_maxHeight,
                        ben_minHeight,
                        ben_regulator,
                        ben_type,
                        ben_color,
                        Product_prod_id: id
                    });
                    return res.status(201).json({msg : "Produto criado como 'Bengala'"})
                }
                else {
                    return res.status(401).json({msg : "OO tipo do produto não é 'Bengala'"});
                }
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"})
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
            const {and_maxHeight} = req.body;
            const {and_minHeight} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Andador") {
                    await knex('Andador').insert({
                        and_lenght,
                        and_maxHeight,
                        and_minHeight,
                        and_regulator,
                        and_width,
                        Product_prod_id: id
                    });
                    return res.status(201).json({msg : "Produto criado como 'Andador'"})
                }
                else {
                    return res.status(401).json({msg : "O tipo do produto não é 'Andador'"});
                }
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async updateProduct(req, res) {
        try {
            const {id} = req.params;

            const {prod_status} = req.body;
            const {prod_height} = req.body;
            const {prod_weight} = req.body;
            const {prod_type} = req.body;
            const {prod_composition} = req.body;

            if(await knex('Product').where('prod_id', id) != "") {
                await knex('Product').update({
                    prod_composition,
                    prod_height,
                    prod_status,
                    prod_type,
                    prod_weight
                }).where('prod_id', id);
                return res.status(201).json({msg : "Produto atualizado"});
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    },

    async updateCadeiraRodas(req, res) {
        try {
            const {id} = req.params;

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
                        cad_maxWeight
                    }).where("Product_prod_id", id);
                    return res.status(201).json({msg : "Produto atualizado como 'Cadeira de Rodas'"})
                }
                else {
                    return res.status(401).json({msg : "O tipo do produto não é 'Cadeira de Rodas'"});
                }
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async updateMuleta(req, res) {
        try {
            const {id} = req.params;

            const {mul_maxWidth} = req.body;
            const {mul_maxHeight} = req.body;
            const {mul_regulator}= req.body;
            const {mul_maxWeight} = req.body;
            const {mul_type} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Muleta") {
                    await knex('Muleta').update({
                        mul_maxHeight,
                        mul_maxWeight,
                        mul_maxWidth,
                        mul_regulator,
                        mul_type
                    }).where('Product_prod_id',id);
                    return res.status(201).json({msg : "Produto atualizado como 'Muleta'"})
                }
                else {
                    return res.status(401).json({msg : "O tipo do produto não é 'Muleta'"});
                }
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async updateBengala(req, res) {
        try {
            const {id} = req.params;

            const {ben_minHeight} = req.body;
            const {ben_maxHeight} = req.body;
            const {ben_regulator}= req.body;
            const {ben_type} = req.body;
            const {ben_color} = req.body

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Bengala") {
                    await knex('Bengala').update({
                        ben_maxHeight,
                        ben_minHeight,
                        ben_regulator,
                        ben_type,
                        ben_color
                    }).where('Product_prod_id', id);
                    return res.status(201).json({msg : "Produto atualizado como 'Bengala'"})
                }
                else {
                    return res.status(401).json({msg : "O tipo do produto não é 'Bengala'"});
                }
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },

    async updateAndador(req, res) {
        try {
            const {id} = req.params;

            const {and_lenght} = req.body;
            const {and_width} = req.body;
            const {and_regulator}= req.body;
            const {and_maxHeight} = req.body;
            const {and_minHeight} = req.body;

            const consult = await knex('Product').where('prod_id', id);
            if(consult != '') {
                if(consult[0].prod_type == "Andador") {
                    await knex('Andador').update({
                        and_lenght,
                        and_maxHeight,
                        and_minHeight,
                        and_regulator,
                        and_width
                    }).where("Product_prod_id", id);
                    return res.status(201).json({msg : "Produto atualizado como 'Andador'"})
                }
                else {
                    return res.status(401).json({msg : "O tipo do produto não é 'Andador'"});
                }
            }
            else {
                return res.status(401).json({msg : "Este produto não existe"})
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message})
        }
    },


    async deleteProduct(req, res) {
        try {
            const {id} = req.params;
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
                return res.status(201).json({msg : "Produto deletado"});
            }
            else {
                return res.status(400).json({msg : "Este produto não existe"});
            }
        }
        catch(error) {
            return res.status(400).json({error : error.message});
        }
    }
}
