
const socket = io();

let params = new URLSearchParams(window.location.search);
if(!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('A name and room are required');
}

let user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', () => {
    console.log('Connected > Server');

    socket.emit('join-to-chat', user, (x) => {
        // console.log('Connected users', x);
        renderUsers(x);
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

// socket.emit('private-message', {
//     name: 'September',
//     msg: 'here!',
//     to: '1ycqyLjQ6QrNGk8sAAAH'
// });

socket.on('send-message', x => {
    // console.log('Server: ', x);
    renderMessages(x, 'everyone');
    scrollBottom();
});

socket.on('connected-users', (x) => {
    // console.log('Connected users: ', x);
    renderUsers(x);
});

socket.on('private-message', (x) => {
    console.log('Private message: ', x);
});
