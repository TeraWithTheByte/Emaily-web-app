const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('config\\keys');
/*Notice below that User must be required BEFORE passport*/
require('.\\models\\User'); //defines the 'users' collection
require('.\\services\\passport'); //invokes the 'users' collection

//const path = require('path');
//require(path.join('.', 'services', 'passport'));

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey] //you can add multiple keys for additional level of security
  })
);
app.use(passport.initialize());
app.use(passport.session());

//execute the arrow func exported in authRoutes.js
//require(path.join('.', 'routes', 'authRoutes'))(app);
require('.\\routes\\authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
