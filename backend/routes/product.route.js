import express from 'express';
import {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
} from '../controller/product.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { adminRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.get('/featured', getFeaturedProducts);
router.post('/', protectRoute, adminRoute, createProduct);

export default router;
