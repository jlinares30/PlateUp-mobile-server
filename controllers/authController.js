import User from '../models/User.js';
import { hash as _hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import logger from '../config/logger.js';

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const hash = await _hash(password, 10);
    const userData = { name, email, password: hash };
    if (req.file) {
      userData.image = req.file.path;
    }
    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Email already in use' });
  }
}


export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  logger.info("JWT_SECRET logic execution");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image
    },
  });
}

export async function updateProfile(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }
    if (password) {
      user.password = await _hash(password, 10);
    }

    if (req.file) {
      // Subida manual a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: 'meal_plans_app',
        folder: 'users',
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: 35 },
          { fetch_format: "auto" }
        ]
      });

      // Delete old image if exists
      if (user.imagePublicId) {
        cloudinary.uploader.destroy(user.imagePublicId);
      }

      user.image = result.secure_url;
      user.imagePublicId = result.public_id;
      // Borrar archivo local
      fs.unlinkSync(req.file.path);
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      }
    });

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        logger.error("Error deleting local file:", unlinkError);
      }
    }
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
}

