const express = require('express');
const router = express.Router();
const User = require('../models');

router.get('/', async (req, res, next) => {
  res.send('hi')
})

module.exports = router;