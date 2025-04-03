import mongoose from 'mongoose';

// Define Resume schema
const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeUrl: { type: String, required: true },
});

// Export the model as a default export
const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;  // Use default export
