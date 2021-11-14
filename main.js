const express = require('express');
const app = express();
const http = require('http');
const {Server} = require("socket.io");
const server = http.createServer(app);
const io = new Server(server)

hostname = "0.0.0.0"
port = 24333

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    console.log("User connected ! ")

    socket.on("disconnect", () => {
        console.log("User disconnected")
    })

    socket.on("new_move", (move) => {
        console.log(`New move : ${move}`)
        io.emit("new_move", move)
    })

    socket.onAny((event, ...args) => {
        console.log(`Server received : ${event}`)
        console.log(args)
    })
})

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});