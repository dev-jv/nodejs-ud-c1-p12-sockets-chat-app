
let paramsx = new URLSearchParams(window.location.search);
let name = paramsx.get('name');
let room = paramsx.get('room');

let divUsers = $('#divUsers');
let formSend = $('#formSend');
let txtMessage = $('#txtMessage');
let divChatbox = $('#divChatbox');

const renderUsers = (persons) => {
    console.log(persons);

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

const renderMessages = (message) => {
    console.log(message);

    let html = '';

    html += '<li>';
    html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html += '<div class="chat-content">';
    html += '   <h5>' + message.name + '</h5>';
    html += '   <div class="box bg-light-info">' + message.msg + '</div>';
    html += '</div>';
    html += '<div class="chat-time">' + message.date + '</div>';
    html += '</li>';

    divChatbox.append(html);
};

divUsers.on('click', 'a', function() { // ... =>
    let id = $(this).data('id');

    if(id) {
        console.log(id);
    }
});

formSend.on('submit', function (e) {
    e.preventDefault();

    if(txtMessage.val().trim().length === 0) {
        return;
    }

    socket.emit('send-message', {
        name,
        msg: txtMessage.val()
    }, (x) => {
        console.log('Server: ', x);
        txtMessage.val('').focus();
        renderMessages(x);
    });

    console.log(txtMessage.val());
});


