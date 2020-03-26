const express = require('express');
const app = express();
const path = require('path');
const SocketIO = require('socket.io');

app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

const server = app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
})
 

const io = SocketIO(server)

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
})


