const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/User');

const minuteWait = () => {
  const minute = 60000;
  return new Promise(resolve => {
    setTimeout(resolve, minute);
  });
};

const sleep = async (minutes) => {
  for (i = 0; i < minutes; i++) {
    console.log('waiting');
    await minuteWait();
  }
}

router.post('/create', async (req, res, next) => {
  // CREATE new user
  const { name, number, contacts, checkOut, longitude, latitude } = req.body;
  const checkIn = moment().utc().format();
  const now = moment(checkIn);
  const later = moment(checkOut);
  const timeToWait = now.diff(later, 'minutes');
  console.log(timeToWait);

  const user = new User({
    name: name,
    number: number,
    contacts: [contacts],
    checkIn: checkIn,
    checkOut: checkOut
  })

  if (longitude && latitude) {
    user.location = {
      type: 'Point',
      coordinates: [
        longitude,
        latitude
      ]
    }
  }

  try {
    await user.save();
    res.send(user.id);
    sleep(timeToWait);
  }
  catch (err) {
    res.status(500).send(err);
  }
})

router.post('/emergency/:id', async (req, res, next) => {
  // user location latitude, longitude
  const { latitude, longitude } = req.body
  try {
    const user = await User.findById(req.params.id);

    // twilio sms send message to emergency contact
    const accountSid = process.env.SMS_ACC;
    const authToken = process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
      body: `BSAFE ALERT
      I have failed to check out on time!
      At time: TIME CHECK IN
      Location: https://www.google.com/maps/?q=${user.location.coordinates[1]},${user.location.coordinates[0]}
      Last known location:
      Location: https://www.google.com/maps/?q=${latitude},${longitude}`,
      from: '+17344695155',
      to: `+61${user.contacts[0]}`
    })
    .then(message => {
      console.log(message.sid)
      res.send(message);
    });
  }
  catch (err) {
    res.status(500).send(err);
  }
})

router.patch('/update-location/:id', async (req, res, next) => {
  // UPDATE user location
  // expects JSON with new latitude, longitude
  const { latitude, longitude } = req.body;
  try {
    const user = await User.findById(req.params.id);
    user.location = {
      type: 'Point',
      coordinates: [
        longitude,
        latitude
      ]
    }
    await user.save()
    res.send(user.id)
  }
  catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;