const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'))

app.use(express.json())
app.use(cors());

const userRoutes = require('./routes/users');

app.get('/', (req, res) => {
  res.send('Bsafe Backend!!!! :D');
})
app.use('/user', userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`))

