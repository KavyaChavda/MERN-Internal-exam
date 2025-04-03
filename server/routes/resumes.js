import express from 'express';
import cloudinary from '../config/cloudinary.js';  // Default import
import Resume from '../models/resume.js';          // Default import
import upload from '../uploads/multer.js';        // Default import

const router = express.Router();

// POST /api/resumes: Upload resume and save details in DB
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto', // Automatically detect file type (image, video, etc.)
    });

    const newResume = new Resume({
      name: req.body.name,
      email: req.body.email,
      resumeUrl: result.secure_url, // Store Cloudinary URL
    });

    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
