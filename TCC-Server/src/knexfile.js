module.exports = {
    development : {
        client : 'mysql',
        connection: {
            host: "localhost",
            port: 3306,
            user: process.env.SERVER_USER,
            password: "",
            database: 'willchair'
        }
    }
}