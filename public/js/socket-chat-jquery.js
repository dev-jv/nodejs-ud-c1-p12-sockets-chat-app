
let paramsx = new URLSearchParams(window.location.search);

let divUsers = $('#divUsers');

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
