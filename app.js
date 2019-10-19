const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
// app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Bsafe Backend!!!! :D');
})
app.listen(PORT, () => console.log(`listening on port: ${PORT}`))

