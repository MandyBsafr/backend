const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// TODO:
// SMS ami hookup
// endpoint for end session / mark for deletion

router.get('/emergency/:id', async (req, res, next) => {

  try {
    const user = await User.findById(req.params.id);
    console.log(user.contacts[0]);
    const accountSid = process.env.SMS_ACC;
    const authToken = process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    client.messages
    .create({
      body: `BSAFE ALERT
      I have failed to check out on time!
      `,
      from: '+17344695155',
      to: `+61${user.contacts[0]}`
    })
    .then(message => {
      console.log(message.sid)
      res.send(message);
    });
    res.send('Successful text');
  }
  catch (err) {
    res.status(500).send(err);
  }
})

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

module.exports = router;