const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../data/helpers/userDb.js');

router.get('/', (req, res) => {
    res.send('IT WORKINGGGGG')
})

router.post('/register', (req, res) => {
    let user = req.body;

    //hash the password
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error)
        });
});


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
})

router.get('/users', restricted , (req, res) => {
    Users.findUsers()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

function restricted( req, res , next) {
    const { username, password } = req.headers;

    if (username && password) {
      Users.findBy({ username })
        .first()
        .then(user => {
          // check tha password guess against the database
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).json({ message: 'You shall not pass!!' });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    } else {
      res.status(401).json({ message: 'Please provide credentials' });
    }
}


module.exports = router;