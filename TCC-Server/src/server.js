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
        origin: "http://127.0.0.1:5173"
    }
});

io.on("connection", (socket) => {
    socket.emit("message", "Funfa");
    
    socket.on("reqMsg", async (data) => {
        const msgs = await knex("Message").where("Chat_chat_id", data)
        io.emit("showMsg", msgs);
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
    });

    socket.on("findOther", async (data) => {
        const consult = await knex("Chat").where("chat_id", data).join("Offer", "Offer_ofr_id", "ofr_id").join("User", "Offer.User_user_id", "user_id");
        const result =  {
            user_img : consult[0].user_img,
            user_id :  consult[0].user_id,
            user_name : consult[0].user_name
        }
        socket.emit("otherUser", result);
    })
});

server.get('/', async (req, res) => {
    await res.send("Root of the Willchair server.");
});

module.exports = server;