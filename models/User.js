const mongoose = require('mongoose'); //mongoose object
const { Schema } = mongoose; //Schema object

const userSchema = new Schema({
  googleID: String
});

mongoose.model('users', userSchema); //create Users collection in db
