import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper middleware to check admin
function requireAdmin(req: any, res: any, next: any) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Create product (admin only)
router.post('/',
  auth,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('basePrice').isNumeric().withMessage('Base price must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('images').isArray().withMessage('Images must be an array')
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update product (admin only)
router.put('/:id',
  auth,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Delete product (admin only)
router.delete('/:id',
  auth,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router; 