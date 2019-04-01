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



module.exports = router;