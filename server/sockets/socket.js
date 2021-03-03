const colors = require('colors');

const {io} = require('../server');
const {Users} = require('../classes/users');

const users = new Users();

io.on('connect', socketClient => { // "connection" event

    console.log('Connected client'.gray, socketClient.id);

    socketClient.on('joinToChat', (user, callback) => {
        // console.log(user);
        if(!user.name) {
            return callback({
               error: true,
               msg: 'Required name'
            });
        }
        const persons = users.addPerson(socketClient.id, user.name);
        socketClient.broadcast.emit('connectedusers', users.getPersons());
        callback(persons);

        console.log('PERSONS'.bgBlue, users.persons);
    });

    socketClient.on('disconnect', () => {
        let deletedPerson = users.deletePerson(socketClient.id);
        socketClient.broadcast.emit('userlefttheroom', {user: 'administrator', msg: `${deletedPerson.name} left the chat..`});
        socketClient.broadcast.emit('connectedusers', users.getPersons());
        console.log('DELETED '.bgRed, deletedPerson);
        // console.log('Diconnected client'.brightWhite, socketClient.id);
    });
});
