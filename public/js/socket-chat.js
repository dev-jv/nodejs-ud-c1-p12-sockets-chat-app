
const socket = io();

let params = new URLSearchParams(window.location.search);
if(!params.has('name')) {
    window.location = 'index.html';
    throw new Error('A name is required');
}

let user = {
    name: params.get('name')
};

socket.on('connect', () => {
    console.log('Connected > Server');

    socket.emit('joinToChat', user, (x) => {
        console.log('Connected users', x);
    });
});

socket.on('diconnect', () => {
    console.log('Disconnected > Server');
});

// socket.emit('send-message', {
//     name: 'Drac',
//     msg: 'blaaa bla bla blaaah!!. '
// }, (x) => {
//     console.log('Server: ', x);
// });

socket.on('send-message', (x) => {
    console.log('Server: ', x);
});

socket.on('connectedusers', (x) => {
    console.log('Connected users: ', x);
});
