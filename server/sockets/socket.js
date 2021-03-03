const colors = require('colors');

const {io} = require('../server');
const {Users} = require('../classes/users');

const users = new Users();

io.on('connect', socketClient => { // "connection" event

    console.log('Connected client'.gray, socketClient.id);

    socketClient.on('joinToChat', (user, callback) => {
        console.log(user);
        if(!user.name) {
            return callback({
               error: true,
               msg: 'Required name'
            });
        }
        const persons = users.addPerson(socketClient.id, user.name);

        callback(persons);

    })

    // socketClient.on('disconnect', () => {
    //     //     console.log('Diconnected client'.brightWhite, socketClient.id);
    //     // });


});
