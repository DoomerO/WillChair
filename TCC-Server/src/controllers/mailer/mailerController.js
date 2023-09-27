const mailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.Oauth2;


module.exports = {

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
    }
}