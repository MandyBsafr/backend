const express = require('express');
const cors = require('cors');
const app = express();
// const morgan = require('morgan');
const mongoose = require('mongoose');
const moment = require('moment');
moment().format();
require('dotenv').config();

// mutates the values
// const now = moment();
// const regular = moment('2019-10-19T22:51:00.253Z').format('')
// regular.isBefore(now)
// console.log(moment("2019-10-19T22:51:00.253Z"));

// app.use(morgan('dev'))
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:8080/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

const uri = "mongodb+srv://PushButtons:admin@cluster0-gvgtm.mongodb.net/bsafr_db?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true,  useNewUrlParser: true}, (err, success) => {
  if (err) { return console.error(err) }
  console.log('Connection Status: Success');
});

const userRoutes = require('./routes/users');

app.get('/', (req, res) => {
  res.send('Bsafe Backend!!!! :D');
})
app.use('/users', userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`))

