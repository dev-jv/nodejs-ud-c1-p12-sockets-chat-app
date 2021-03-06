const colors = require('colors');

const {io} = require('../server');
const {Users} = require('../classes/users');
const {message} = require('../utilities/utilities');

const users = new Users();

io.on('connect', socketClient => { // "connection" event

    console.log('Connected client'.gray, socketClient.id);

    socketClient.on('join-to-chat', (user, callback) => {
        // console.log(user);
        if (!user.name || !user.room) {
            return callback({
                error: true,
                msg: 'Name and room are required'
            });
        }

        socketClient.join(user.room);

        users.addPerson(socketClient.id, user.name, user.room);

        const data = {
            lst: users.getPersonsByRoom(user.room),
            dlt: ''
        };

        socketClient.broadcast.to(user.room).emit('connected-users', data);
        socketClient.broadcast.to(user.room).emit('send-message', message('Administrator', `${user.name} joined the chat!`));
        callback(users.getPersonsByRoom(user.room));
        // console.log('PERSONS'.brightWhite, users.persons);
    });

    socketClient.on('send-message', (data, callback) => {
        const user = users.getPerson(socketClient.id);
        // let msg = message(data.name, data.msg);
        const msg = message(user.name, data.msg);
        socketClient.broadcast.to(user.room).emit('send-message', msg);
        callback(msg);
    });

    socketClient.on('disconnect', () => {
        const deletedPerson = users.deletePerson(socketClient.id);
        socketClient.broadcast.to(deletedPerson.room).emit('send-message', message('Administrator', `${deletedPerson.name} left the chat..`));

        const data = {
            lst: users.getPersonsByRoom(deletedPerson.room),
            dlt: deletedPerson
        };

        socketClient.broadcast.to(deletedPerson.room).emit('connected-users', data);
        // console.log('DELETED '.bgWhite.black, deletedPerson);
        // console.log('Diconnected client'.brightWhite, socketClient.id);
    });

    socketClient.on('private-message', data => {
        const user = users.getPerson(socketClient.id);
        socketClient.broadcast.to(data.to).emit('private-message', message(user.name, data.msg)); // data.to, to.. is a ref.
    });
});
