
const lblOnline = document.querySelector('#lblOnline');
const lblOfline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', function () {
    console.log('Connected > Server');
    lblOnline.style.display = '';
    lblOfline.style.display = 'none';
});

socket.on('diconnect', function() {
    console.log('Disconnected > Server');
    lblOnline.style.display = 'none';
    lblOfline.style.display = '';
});

socket.on('send-msg', function (msg) {
    console.log('Server: ', msg);
});

btnSend.addEventListener('click', () => {
    const msg = txtMessage.value;
    console.log(msg);

    const payload = {
        msg,
        id: '123ABC',
        date: new Date().getTime()
    };

    socket.emit('send-msg', payload, ( kallback ) => {
        console.log('Response from server:', kallback);
    });
});
