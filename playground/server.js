const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

class UserService {
    constructor() {
        if (!UserService.instace) {
            this.users = [
                {
                    'id': 1,
                    'firstName': 'Inbi',
                    'lastName': 'Fried Cohen'
                },
                {
                    'id': 2,
                    'firstName': 'Shoval',
                    'lastName': 'Cohen'
                },
                {
                    'id': 3,
                    'firstName': 'Ilay',
                    'lastName': 'Fried'
                },
            ]
            UserService.instance = this;
        }
        return UserService.instance;
    }

    getAllUsers() {
        return this.users;
    }

    addUser(user) {
        this.users.push(user);
    }

    updateUser(user) {
        this.users.find(usr => usr.id === user.id).map(usr => user);
    }

    getUser(id) {
        return this.users.find(usr => usr.id === id);
    }

    deletUser(id) {
        this.users = this.users.filter(usr => usr.id !== id);
    }
}

const usersData = new UserService();
Object.freeze(usersData);



app.get('/*', (req, res, next) => {
    console.log('Welcome to my app!');
    next();
});

app.get('/inbi', (req, res) => {
    res.send('My love!');
});

app.get('/users', function (req, res) {
    res.json(usersData.getAllUsers());
});

app.get('/users/:userId', function (req, res) {
    let user = usersData.getUser(parseInt(req.params.userId));
    if (!user) {
        res.status(404).send(`There is no user with id: ${req.params.userId}`);
    }
    res.json(user);
});

app.post('/addUser', (req, res) => {
    usersData.addUser(req.body);
    res.send(`User with id ${req.body.id} added successfully`)
});

app.put('/updateUser', (req, res) => {
    usersData.updateUser(req.body);
    res.send(`User with id ${req.body.id} added successfully`)
});

app.delete('deleteUser/:userId', (req, res) => {
    usersData.deletUser(parseInt(req.params.userId));
    res.send(`User with id ${req.params.userId} is no longer exist.`);
});

app.listen(port, () => {
    console.log(`The app listening on port: ${port}`);
    console.log(`Use it here http://localhost:${port}`);

});

// usersData.addUser({
//     id: 5,
//     firstName: 'Yaara',
//     lastName: 'Fried Amar'
// });

// console.log(JSON.stringify(usersData.getUser(5), null, ' '));

// console.log(JSON.stringify(usersData.getAllUsers(), null, ' '));

