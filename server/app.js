import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumes.js';

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

app.use('/api/resumes', resumeRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('MongoDB URI:', process.env.MONGODB_URI);
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
