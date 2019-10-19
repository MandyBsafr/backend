const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

mongoose.connect(process.env.DB_HOST, {useUnifiedTopology: true,  useNewUrlParser: true}, (err, success) => {
  if (err) { return console.error(err) }
  console.log('Connection Status: Success');
});

const userRoutes = require('./routes/users');

app.get('/', (req, res) => {
  res.send('Bsafe Backend!!!! :D');
})
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`))

