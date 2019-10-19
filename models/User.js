const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('User', UserSchema)