const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/create', async (req, res, next) => {
  // CREATE new user
  const user = new User({
    name: req.body.name,
    number: req.body.number,
  });
  user.contacts = [];
  user.contacts.push(...req.contacts);
})