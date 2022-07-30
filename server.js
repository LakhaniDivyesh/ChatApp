const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);


app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

http.listen(port,()=>{
    console.log(`${port} is running...`);
})

io.on("connection",(socket)=>{
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg);
    })
})
