const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors())
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000/',
        methods: ["GET", "POST"],
        credentials: true
    }
});



io.on("connection", socket => {
    socket.on("message", ({name, text}) => {
        console.log(name, text);
        io.emit("message", {name, text});
    })

})

server.listen(4000, () => {
  console.log('listening on *:4000');
});