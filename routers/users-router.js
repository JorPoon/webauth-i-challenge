const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../data/helpers/userDb.js');

router.get('/', (req, res) => {
    res.send('IT WORKINGGGGG')
})



module.exports = router;