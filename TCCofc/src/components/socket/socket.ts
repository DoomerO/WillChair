import {io} from "socket.io-client";

export const socket = io("https://willchair-server.onrender.com", {
    autoConnect : false
});