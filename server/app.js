const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin : "*",
        methods: ["GET","POST","OPTIONS"],
    },
});


server.listen(PORT, () => {
    //console.log(`Sunucu ${PORT} üzerinden sunulmaktadır.`);
    io.on("connection", socket => {
        console.log("SOCKET")
        console.log(socket.id)

        socket.emit("WELCOME_MESSAGE", `${socket.id} Hoşgeldin.`);
        socket.on("NEW_BOOKMARK_EVENT",(bookmark) => {
            io.emit("NEW_BOOKMARK_ADDED", bookmark)
        })
    })
})