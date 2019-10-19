const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.post('/create', async (req, res, next) => {
  // CREATE new user

  const user = new User({
    name: req.body.name,
    number: req.body.number,
    contacts: [req.body.contacts],
    location: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    }
  })

  try {
    await user.save();
    res.send(user);
  }
  catch (err) {
    res.status(500).send(err);
  }

  console.log(user);
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