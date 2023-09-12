
const knex = require('../../database/database');
const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const path = require("path");
const fs = require('fs');

//multer
const multer = require('multer');
const storageUser = multer.diskStorage({
    destination : "./userProfile",
    filename : function (req, file, cb) {
        const fileName = "dummy" + path.extname(file.originalname);
        cb(null, fileName);
    }
})
const uploadUser = multer({storage : storageUser});

module.exports= {

    async sendConfirmationEmailPasswordChange(req, res) {
        try {
            const {toWho} = req.params;
            const credentials = {
                host : 'Gmail',
                port : 587,
                secure: false,
                auth: {
                  user: "tccwillchair@gmail.com", 
                  pass: "willchair2023"  
                }
            }

            const transporter = mailer.createTransport(credentials);

            const contacts = {
                from: "tccwillchair@gmail.com",
                to : toWho
            }

            const content = {
                subject: 'Confirme seu email',
                html: `
                <a href='localhost:5173/confirmation/${toWho}/${"/"}'>
                    Você pode clicar aqui!
                </a>
                `,      
                text: `Ou copie essa URL: localhost:5173/confirmation/${toWho}/${"/"}`
            }

            const email = Object.assign({}, content, contacts)

            await transporter.sendMail(email);
            res.status(201).json({msg : "Email enviado"})
            
        }
        catch(error) {
            res.status(400).json({error : error.message})
        }
    },

    async searchUsers(req, res) { //recebe todos os cadastros de usuário no sistema
        try {
            const result = await knex('User');
            res.status(201).json(result);
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async searchUserEmail(req, res) {
        try {
            const {email} = req.params;

            const consult = await knex('User').where('user_email', email);

            if(consult != "") {
                const result = {
                    user_id : consult[0].user_id,
                    user_name : consult[0].user_name,
                    user_CEP : consult[0].user_CEP,
                    user_city : consult[0].user_city,
                    user_houseNum : consult[0].user_houseNum,
                    user_phone : consult[0].user_phone,
                    user_img : consult[0].user_img,
                    user_comp : consult[0].user_comp,
                    user_street : consult[0].user_street,
                    user_district : consult[0].user_district,
                    user_FU : consult[0].user_FU,
                    user_email : consult[0].user_email,
                    user_nota : consult[0].user_nota
                }
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "There is no such user with this email"})
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message})
        }
    },

    async searchUserId(req, res) {
        try {
            const {id} = req.params;

            const consult = await knex('User').where('user_id', id);
            if(consult != "") {
                const result = {
                    user_id : consult[0].user_id,
                    user_name : consult[0].user_name,
                    user_CEP : consult[0].user_CEP,
                    user_city : consult[0].user_city,
                    user_houseNum : consult[0].user_houseNum,
                    user_phone : consult[0].user_phone,
                    user_img : consult[0].user_img,
                    user_comp : consult[0].user_comp,
                    user_street : consult[0].user_street,
                    user_district : consult[0].user_district,
                    user_FU : consult[0].user_FU,
                    user_email : consult[0].user_email,
                    user_nota : consult[0].user_nota
                }
                return res.status(201).json(result);
            }
            else {
                return res.status(401).json({msg : "There is no such user wih this id"})
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message})
        }
    },

    async returnImage(req, res) {
        const {filename} = req.params;

        const imagePath = path.resolve(__dirname, '..', '..', '..', 'userProfile', filename);

        fs.readFile(imagePath, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Error in image reading' });
            }

            res.setHeader('contentType',`image/${path.extname(filename)}`);

            res.end(data);
        });
    },

    async searchUserEmailPassword(req, res) { //Autentica um usuário existente
        try {
            const {email} = req.params;
            const {password} = req.params;
            const consult = await knex('User').where("user_email", email);
            if (consult != "") {
                const pass = consult[0].user_password.toString();
                bcrypt.compare(password, pass).then((result) => {
                    if(result) {
                        const user = {name: consult[0].user_name, 
                            email: consult[0].user_email};
                            
                            const acssesToken = jwt.sign( //criação de token
                                user,
                                process.env.TOKEN_KEY_ACSSES,
                                {expiresIn: '3h'}
                            );

                        return res.status(201).json({token : acssesToken})
                    }
                    else {
                        return res.status(401).json({msg: "There is no user with this data"});
                    }
                }).catch((err) => {
                    return res.status(400).json({error: err.message})
                });
            }
            else {
                return res.status(401).json({msg: "There is no user with this data"});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async createUser(req, res) { //cria um novo usuário no sistema
        try {
            const {user_name} = req.body;
            const {user_email} = req.body;
            const {password} = req.body;
            
            if (!user_name || !user_email || !password) {
                return res.status(401).json({msg : "All info must be provided"})
            }

            if (await knex('User').where("user_email", user_email) != "") {
                return res.status(401).json({msg: "This email is alredy in use"});
            }
           
            const user_password = bcrypt.hashSync(password, 10);

            await knex('User').insert({
                user_name,
                user_email,
                user_password
            });
            
            const user = {name: user_name, email: user_email}
            
            const acssesToken = jwt.sign( //criação de token
                user,
                process.env.TOKEN_KEY_ACSSES,
                {expiresIn: '3h'}
            );

            return res.status(201).json({token : acssesToken});

        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async uploadImg(req, res) {
        try {
            const id = req.headers['user_id'];
            
            uploadUser.single("avatar")(req, res, async function(error) {
                if (error instanceof multer.MulterError) {
                    return res.status(400).json({error : error.message})
                  } else if (error) {
                    return res.status(500).json({error : error.message})
                  }

                  if (!req.file) {
                    return res.status(400).json({error: 'There is no file provided'});
                  }
    
                  fs.renameSync(req.file.path, req.file.path.replace('dummy', `user${id}`));
                try {
                    await knex("User").update({
                        user_img : `user${id}${path.extname(req.file.originalname)}`
                    }).where("user_id", id);
          
                    return res.status(201).json({msg : "The image was succesfully uploaded"});
                }
                catch(error) {
                    return res.status(400).json({error: error.message});
                }
            })
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async updateUser(req, res) { //atualiza parâmetros do usuário
        try {
            const {email} = req.params;

            const {user_name} = req.body;
            const {user_phone} = req.body;
            const {user_CEP} = req.body;
            const {user_houseNum} = req.body;
            const {user_city} = req.body;
            const {user_street} = req.body;
            const {user_district} = req.body;
            const {user_FU} = req.body
            const {user_comp} = req.body;

            const consult = await knex('User').where("user_email", email);

            if (consult != "") {
                await knex("User").update({
                    user_name,
                    user_phone,
                    user_CEP,
                    user_houseNum,
                    user_city,
                    user_street,
                    user_FU,
                    user_district,
                    user_comp
                }).where('user_email', email);

                if (await knex("Offer").where("User_user_id", consult[0].user_id)) {
                    await knex("Offer").update({
                        ofr_city : user_city,
                        ofr_user_name : user_name      
                    }).where('User_user_id', consult[0].user_id);
                }
            }
            else {
                return res.status(401).json({msg: "This user does not exists"});
            }

            const user = {name: user_name, email: consult[0].user_email}
            
            const acssesToken = jwt.sign( //criação de token
            user,
            process.env.TOKEN_KEY_ACSSES,
            {expiresIn: '3h'});

            return res.status(201).json({token: acssesToken});
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    },

    async updateUserPassword(req, res) { //Atualiza a senha do usuário
        try {
            const {email} = req.params;

            const {password} = req.body;

            if(!email || !password) {
                return res.status(401).json({msg : "All data must be distributed"})
            }

            if (await knex('User').where("user_email", email) != "") {
                const user_password = bcrypt.hashSync(password, 10);
                await knex("User").update({
                   user_password
                }).where('user_email', email);
            }
            else {
                return res.status(401).json({msg: "This user does not exists"});
            }
            return res.status(201).json({msg: "Password of " + email  + " updated"});
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async updateUserEmail(req, res) {
        try {
            const {id} = req.params;

            const {email} = req.body;

            if(await knex("User").where("user_email", email) != "") {
                return res.status(401).json({msg: "There is a user with this email alredy."})
            }
            const consult = await knex("User").where("user_id", id);
            if(consult !="") {
                await knex("User").update({
                    user_email : email
                }).where("user_id", id);

                const user = {name: consult[0].user_name, email: email}
            
                const acssesToken = jwt.sign( //criação de token
                user,
                process.env.TOKEN_KEY_ACSSES,
                {expiresIn: '3h'});

                return res.status(201).json({token : acssesToken});
            }
            return res.status(401).json({msg : "There is no user with this id"});            
        }
        catch(error) {
            return res.status(400).json({error: error.mesage});
        }
    },

    async deleteUser(req, res) { //deleta um usuário  pelo id
        try {
            const {id} = req.params;
            if (await knex("User").where("user_id", id) != "") {
                await knex('User').del().where("user_id", id);
                return res.status(201).json({msg: "User deleted"});
            }
            else {
                return res.status(401).json({msg: "This user does not exists"});
            }
        }
        catch(error) {
            return res.status(400).json({error: error.message});
        }
    }
}
