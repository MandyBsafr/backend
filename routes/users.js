const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

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

// TODO:
// SMS ami hookup
// endpoint for end session / mark for deletion

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

module.exports = router;