require('dotenv/config');
const express = require('express');
const helmet = require('helmet');
const knex = require("./database/database")
const cors = require('cors');
const routes = require('./routes');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(routes);

const {Server} = require('socket.io');

const io = new Server(3000, {
    cors : {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    socket.emit("message", "Funfa");
    
    socket.on("reqMsg", async (data) => {
        console.log(2)
        const msgs = await knex("Message").where("Chat_chat_id", data)
        socket.emit("showMsg", msgs);
        socket.emit("ganbis", msgs);
    })

    socket.on("postMessage", async (data) => {
        await knex("Message").insert({
            msg_content : data.msg,
            Chat_chat_id : data.chat,
            User_user_id : data.user
        })
    })

    socket.on("endChat", async (data) => {
        await knex("Chat").del().where("chat_id", data);
        await knex("Message").del().where("Chat_chat_id", data);
        socket.emit("Desconnect", "Chat finalizado...");
    })
});

server.get('/', async (req, res) => {
    await res.send("Root of the Willchair server.");
});

module.exports = server;