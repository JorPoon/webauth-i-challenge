const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)

const authRouter = require('./routers/auth-router.js')
const usersRouter = require('./routers/users-router.js');

const configureKnex = require('./data/dbConfig.js');

const server = express();

const sessionConfig = {
    name: 'jmpauth',
    secret: 'shhhhhhhhhh',
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUnitialized: false,
    store: new KnexSessionStore({
        knex: configureKnex,
        tablename: 'session',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

module.exports = server;
