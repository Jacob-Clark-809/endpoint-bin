require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const saveRequest = require('./routes/middleware/save-request');

const port = process.env.PORT;
const app = express();

app.use(cors());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DDB_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

// accepts request at endpoint, saves in DB
app.all('/listen/:endpoint*', saveRequest)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
