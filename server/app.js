import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const express = require('express');
const port = 5173;
const app = express();

app.use(cors());
app.use(express.json());

// Add API endpoints here
app.get('/api/test', (req, res) => {
  res.send('Hello from backend!');
});

// Sample route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    // app.listen(process.env.PORT || 5000, () => {
    //   console.log('Server running');
    // });
  })
  .catch((err) => console.log(err));