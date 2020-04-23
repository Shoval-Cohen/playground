const EventEmitter = require('events');

class Person extends EventEmitter{
    constructor(age) {
        this.age = age;
    }
    
    bday() {
        this.emit('birthday', this.age);
    }
}

const inbi = new Person();

inbi.on('birthday', age => console.log('Omg she is ' + age))