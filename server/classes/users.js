
class Users {

    constructor() {
        this.persons = [];
    }

    addPerson(id, name) {
        let person = {id, name};
        this.persons.push(person);
        return this.persons;
    }

    getPerson(id) {
        let person = this.persons.filter(person => person.id === id)[0];
        return this.persons;
    }

    getPersons() {
        return this.persons;
    }

    getPersonsByRoom(room) {
        //...
    }

    deletePerson(id) {
        let deletedPerson = this.getPerson(id);
        this.persons = this.persons.filter(person => person.id !== id);
        return deletedPerson;
    }
}

module.exports = {
  Users
};
