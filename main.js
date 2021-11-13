const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server)

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
})
server.listen(3000, () => {
    console.log('listening on *:3000');
});