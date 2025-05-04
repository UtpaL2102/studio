import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order';
import { auth } from '../middleware/auth';

const router = express.Router();

// Helper middleware to check admin
function requireAdmin(req: any, res: any, next: any) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Get all orders (admin only)
router.get('/', auth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('product', 'name basePrice');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: (req as any).user._id })
      .populate('product', 'name basePrice');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single order
router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('product', 'name basePrice');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user is admin or order owner
    if (!(req as any).user.isAdmin && order.user._id.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create order
router.post('/',
  auth,
  [
    body('product').notEmpty().withMessage('Product ID is required'),
    body('customizations').isObject().withMessage('Customizations must be an object'),
    body('totalPrice').isNumeric().withMessage('Total price must be a number'),
    body('shippingAddress').isObject().withMessage('Shipping address is required'),
    body('shippingAddress.street').notEmpty().withMessage('Street is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.state').notEmpty().withMessage('State is required'),
    body('shippingAddress.zipCode').notEmpty().withMessage('Zip code is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required')
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const order = new Order({
        ...req.body,
        user: (req as any).user._id
      });

      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update order status (admin only)
router.patch('/:id/status',
  auth,
  requireAdmin,
  [
    body('status').isIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status')
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router; 