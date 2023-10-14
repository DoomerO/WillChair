module.exports = {
    development : {
        client : 'mysql',
        connection: {
            host: process.env.SERVER_ENDPOINT,
            port: 3306,
            user: process.env.SERVER_USER,
            password: process.env.SERVER_PASSWORD,
            database: 'willchair'
        }
    }
}