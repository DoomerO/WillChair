require('dotenv/config');
const knex = require("./src/database/database")
const server = require('./src/server');

const PORT = 3344;

const servidor = server.listen(PORT, console.log("Server on in door " + PORT));

const {Server} = require('socket.io');

const io = new Server(servidor, {
    cors : {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    socket.emit("message", "Funfa");
    
    socket.on("reqMsg", async (data) => {
        const msgs = await knex("Message").where("Chat_chat_id", data)
        io.emit(`showMsg:${data}`, msgs);
    })

    socket.on("postMessage", async (data) => {
        await knex("Message").insert({
            msg_content : data.msg,
            Chat_chat_id : data.chat,
            User_user_id : data.user
        })
        const msgs = await knex("Message").where("Chat_chat_id", data.chat);
        io.emit(`showMsg:${data.chat}`, msgs);
    })

    socket.on("endChat", async (data) => {
        await knex("Chat").del().where("chat_id", data);
        await knex("Message").del().where("Chat_chat_id", data);
        socket.emit("Desconnect", "Chat finalizado...");
    });

    socket.on("findOwner", async (data) => {
        const consult = await knex("Chat").where("chat_id", data).join("Offer", "Offer_ofr_id", "ofr_id").join("User", "Offer.User_user_id", "user_id");
        const result =  {
            user_img : consult[0].user_img,
            user_id :  consult[0].user_id,
            user_email : consult[0].user_email,
            user_name : consult[0].user_name,
            ofr_id : consult[0].ofr_id,
            ofr_owner_id : consult[0].User_user_id
        }
        socket.emit("otherUser", result);
    })

    socket.on("findOther", async (data) => {
        const consult = await knex("Chat").where("chat_id", data).join("Offer", "Offer_ofr_id", "ofr_id").join("User", "Chat.User_user_id", "user_id");
        const result =  {
            user_img : consult[0].user_img,
            user_id :  consult[0].user_id,
            user_email : consult[0].user_email,
            user_name : consult[0].user_name,
            ofr_id : consult[0].ofr_id,
            ofr_owner_id : consult[0].User_user_id
        }
        socket.emit("otherUser", result);
    })

    socket.on("setIntrest", async (data) => {
        const consult = await knex("Offer").where("ofr_id", data.offerId);
        if (!consult[0].user_comp_id) { //interesse própriamente iniciado
            await knex("Offer").update({
                ofr_status : "Ocupada",
                user_comp_id : data.userId
            }).where("ofr_id", data.offerId); 
            return socket.emit("intrestOprRes", 201);  
        }
        else { //Já existe um usuário interessado nesta oferta
            return socket.emit("intrestOprRes", 401);  
        }
    })

    socket.on("deleteMsg", async (data) => {
        await knex("Message").update({
            msg_show : 0
        }).where("msg_id", data.msgId);
        const msgs = await knex("Message").where("Chat_chat_id", data.chat);
        io.emit(`showMsg:${data.chat}`, msgs);
    })
});