const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  contacts: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('User', UserSchema)