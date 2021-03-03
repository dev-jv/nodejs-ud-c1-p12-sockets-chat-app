
const socket = io();

let params = new URLSearchParams(window.location.search);
if(!params.has('name')) {
    window.location = 'index.html';
    throw new Error('A name is required');
}

let user = {
    name: params.get('name')
};

socket.on('connect', function () {
    console.log('Connected > Server');

    socket.emit('joinToChat', user, (x) => {
        console.log('Connected users', x);
    });
});

socket.on('diconnect', function() {
    console.log('Disconnected > Server');
});

socket.on('send-msg', function (msg) {
    console.log('Server: ', msg);
});
