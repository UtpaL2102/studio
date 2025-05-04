import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { auth } from '../middleware/auth';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const router = express.Router();

// Register
router.post('/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/\d/).withMessage('Password must contain a number')
      .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    body('name').notEmpty().withMessage('Name is required')
  ],
  async (req: Request, res: Response) => {
    try {
      console.log('Register request received:', { body: req.body });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name } = req.body;
      console.log('Checking for existing user with email:', email);

      // Check if user already exists
      let user = await User.findOne({ email: email.toLowerCase() }); // Ensure email is unique in lowercase
      if (user) {
        console.log('User already exists:', email);
        return res.status(400).json({ error: 'User already exists', field: 'email' });
      }

      // Create new user
      user = new User({
        email: email.toLowerCase(),
        password,
        name
      });

      await user.save();
      console.log('User saved successfully:', user._id);

      // Generate JWT
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.status(201).json({ token, user: { _id: user._id, email: user.email, name: user.name } });
    } catch (error) {
      console.error('Register error details:', error);
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: errMsg || 'Server error' });
    }
  }
);


router.post('/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email }) as IUser;  // Explicitly cast to IUser
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: errMsg || 'Server error' });
    }
  }
);



// Get current user
router.get('/me', auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 