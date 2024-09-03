const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/posts', postsRouter);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    if (process.env.NODE_ENV !== 'test') {
      console.log('MongoDB connected');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectToDatabase();

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
