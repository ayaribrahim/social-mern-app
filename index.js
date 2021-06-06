const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const postsRouter = require('./routes/posts.js');
const authRouter = require('./routes/auth.js');



app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);


const db_string = process.env.MONGO_CONNECT_STRING;
const port = process.env.PORT || 5000;


mongoose.connect(db_string, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
  console.log('DATABASE SUCCESS...')
  app.listen(port, () => {
    console.log(`SERVER IS UP ON ${port}..`);
  });
}).catch(err => {
  console.log(err.message)
})








