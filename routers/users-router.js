const router = require('express').Router();
// const bcrypt = require('bcryptjs');

const Users = require('../data/helpers/userDb.js');

// router.get('/', (req, res) => {
//     res.send('IT WORKINGGGGG')
// })

router.get('/', restricted , (req, res) => {
    Users.findUsers()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

function restricted( req, res , next) {
    if ( req && req.session && req.session.user) {
        next();
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
}


module.exports = router;