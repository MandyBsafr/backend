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
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://PushButtons:admin@cluster0-gvgtm.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("bsafr_db").collection("users");
  // perform actions on the collection object



const userRoutes = require('./routes/users');

app.get('/', (req, res) => {
  res.send('Bsafe Backend!!!! :D');
})
app.use('/users', userRoutes);

  client.close();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`))

