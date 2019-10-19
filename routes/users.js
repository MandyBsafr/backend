const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/:id', async (req, res, next) => {
  // GET user by id
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  }
  catch (err) {
    res.status(500).send(err);
  }
})

router.post('/create', async (req, res, next) => {
  // CREATE new user
  const { name, number, contacts, longitude, latitude } = req.body;

  const user = new User({
    name: name,
    number: number,
    contacts: [contacts]
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
    res.send(user);
  }
  catch (err) {
    res.status(500).send(err);
  }

  res.send(`Created user: ${user}`);
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

module.exports = router;