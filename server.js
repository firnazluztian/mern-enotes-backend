const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).catch(err => console.log(err));
// mongoose .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, }) .then(() => console.log('MongoDB Connected!')) .catch(err => { err => console.log(err) }) 
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');

app.use('/users', usersRouter);
app.use('/items', itemsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});