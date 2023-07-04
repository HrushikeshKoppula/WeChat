const app = require('express')();
const server = require('http').Server(app);
const cors = require('cors');
app.use(cors());
const io = require('socket.io')(server, {
    cors: { origin: 'http://localhost:3000' }
});
const port = 5000;
// rooms=[];
io.on('connection',(socket)=>{
    console.log('user came');
    socket.on('login-attempt',(data)=>{
        // if(rooms.indexOf(data.roomid)===-1)
        // rooms.push(roomid);
        socket.join(data.roomid);
        io.sockets.in(data.roomid).emit('entry',data.username);
    })
    socket.on('message2server',(data)=>{
        io.sockets.in(data.room).emit('message',data);
    });
    socket.on('disconnect',()=>{
        console.log('user left');
    })
})

server.listen(port,()=>console.log(`*${port}`))