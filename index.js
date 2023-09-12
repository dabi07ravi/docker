//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = parseInt(process.env.PORT) || 9000;

app.use(express.json());

// MongoDB connection URL from your .env file
const mongoURL = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/', async (req, res) => {
  await db.collection('users').insertOne(req.body);
  return res.send("user created successfully")
});

app.get('/', async (req, res) => {
    let user = await db.collection('users').find().toArray();
    return res.send(user)
  });

app.listen(port, () => console.log(`Server is running on port: ${port}`));
