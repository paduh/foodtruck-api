import http from 'http';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

//Middleware


//parse appalication/jason
app.use(bodyparser.json({
  limit: config.bodyLimit
}));

//Passport
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//API Routes V1
app.use('/api/v1', routes);

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
