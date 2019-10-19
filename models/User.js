const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

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
    required: true
  },
  checkIn: {
    type: String,
    default: moment().utc(),
    required: true
  },
  checkOut: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  }
})

module.exports = mongoose.model('User', UserSchema)