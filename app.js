const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const routes = require('./routes');
const connection = require('./config/database');
// Need to require the entire Passport config module so app.js knows about it
const MongoStore = require('connect-mongo');
require('./config/passport');
require('dotenv').config();

 //-------------- GENERAL SETUP ----------------

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //expire time
    }
}));

app.get('/', (req, res, next) => {
    res.send('<h1>Hello World (Sessions)</h1>')
});

// -------------- PASSPORT AUTHENTICATION ----------------

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

// -------------- ROUTES ----------------
 

// Imports all of the routes from ./routes/index.js
app.use(routes);



 //-------------- SERVER ----------------

app.listen(3000);



