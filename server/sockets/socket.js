const colors = require('colors');

const {io} = require('../server');
const {Users} = require('../classes/users');
const {message} = require('../utilities/utilities');

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

        console.log('PERSONS'.brightWhite, users.persons);
    });

    socketClient.on('send-message', (data) => {
        const user = users.getPerson(socketClient.id);
        // let msg = message(data.name, data.msg);
        const msg = message(user.name, data.msg);
        socketClient.broadcast.emit('send-message', msg);
    });

    socketClient.on('disconnect', () => {
        const deletedPerson = users.deletePerson(socketClient.id);
        socketClient.broadcast.emit('send-message', message('administrator', `${deletedPerson.name} left the chat..`));
        socketClient.broadcast.emit('connectedusers', users.getPersons());
        console.log('DELETED '.bgWhite.black, deletedPerson);
        // console.log('Diconnected client'.brightWhite, socketClient.id);
    });
});
