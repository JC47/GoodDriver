require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public/')));

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true }, (err,res) => {
  if(err) throw err;

  console.log("DB online");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});