const colors = require('colors');

const {io} =require('../server');

io.on('connect', socketClient => { // "connection" event

    console.log('Connected client'.gray, socketClient.id);

    socketClient.on('disconnect', () => {
        console.log('Diconnected client'.brightWhite, socketClient.id);
    });

    socketClient.on('send-msg', (payload, callback) => {
        const id = 123456;
        socketClient.broadcast.emit('send-msg', payload);
        callback({id: id, mss: "DB response"});
    });
});
