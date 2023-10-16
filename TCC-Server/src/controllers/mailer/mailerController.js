const mailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransport = async () => {
    const oauth2Client = new OAuth2(
        process.env.GOOGLE_API_CLIENT_ID,
        process.env.GOOGLE_API_SECRET_KEY,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_API_REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject("Failed to create the access token");
            }
            resolve(token);
        });
    });

    const credentials = {
        host: 'gmail',
        auth: {
            type: "OAuth2",
            accessToken,
            clientId: process.env.GOOGLE_API_CLIENT_ID,
            clientSecret: process.env.GOOGLE_API_SECRET_KEY,
            refreshToken: process.env.GOOGLE_API_REFRESH_TOKEN
        },
        tls: {
            rejectUnauthorized: false
        }
    }

    const transporter = mailer.createTransport(credentials);

    return transporter
}

const createEmail = (contacts, content) => {
    const email = Object.assign({}, content, contacts)
    return email;
}

module.exports = {
    async sendConfirmationEmailPasswordChange(req, res) {
        try {
            const { toWho } = req.params;
            const { path } = req.body;

            const contacts = {
                from: process.env.GOOGLE_API_EMAIL,
                to: toWho
            }

            const content = {
                subject: 'Confirme seu email',
                html: `
                <a href='https://willchair-web-app/confirmation/${toWho}/${path}'>
                    Você pode clicar aqui!
                </a>
                `,
                text: `Ou copie essa URL: https://willchair-web-app/confirmation/${toWho}/${path}`
            }

            let transporter = await createTransport();
            const email = createEmail(contacts, content);

            await transporter.sendMail(email).catch((err) => {
                return res.status(401).json({error : err})
            })
            return res.status(201).json({ msg: "Email enviado" })

        }
        catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}