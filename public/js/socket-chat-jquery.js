
let paramsx = new URLSearchParams(window.location.search);
let name = paramsx.get('name');
let room = paramsx.get('room');

let divUsers = $('#divUsers');
let formSend = $('#formSend');
let txtMessage = $('#txtMessage');
let divChatbox = $('#divChatbox');

const renderUsers = (persons) => {
    // console.log(persons);
    let html = '';

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"><span>' + paramsx.get('room') + '</span> chat</a>';
    html += '</li>';

    for(let i = 0; i < persons.length; i++) {
        html += '<li>';
        html += '    <a data-id="' + persons[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persons[i].name + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    divUsers.html(html);
};

const renderMessages = (message, to) => { // to: myself / everyone
    // console.log(message);
    let html = '';

    let date = new Date(message.date);
    let hour = date.getHours() + ':' + date.getMinutes();

    let adminClass = 'info';
    if(message.name === 'Administrator') {
        adminClass = 'danger';
    }

    if(to === 'myself') {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '   <h5>' + message.name + '</h5>';
        html += '   <div class="box bg-light-inverse">' + message.msg + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hour + '</div>';
        html += '</li>';

        divChatbox.append(html);
    } else {
        html += '<li>';
        if(message.name !== 'Administrator') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += '   <h5>' + message.name + '</h5>';
        html += '   <div class="box bg-light-' + adminClass +'">' + message.msg + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hour + '</div>';
        html += '</li>';

        divChatbox.append(html);
    }
};

const scrollBottom = () => {

    let newMessage = divChatbox.children('li:last-child');

    let clientHeight = divChatbox.prop('clientHeight');
    let scrollTop = divChatbox.prop('scrollTop');
    let scrollHeight = divChatbox.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
};

divUsers.on('click', 'a', function() { // ... =>
    let id = $(this).data('id');

    if(id) {
        console.log(id);
    }
});

formSend.on('submit', (e) => {
    e.preventDefault();

    if(txtMessage.val().trim().length === 0) {
        return;
    }

    socket.emit('send-message', {
        name,
        msg: txtMessage.val()
    }, (x) => {
        // console.log('Server: ', x);
        txtMessage.val('').focus();
        renderMessages(x, 'myself');
        scrollBottom();
    });
    // console.log(txtMessage.val());
});
