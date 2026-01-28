import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

/* ===========================
   PUBLIC ROUTES (NO AUTH)
   =========================== */

// Shop – all products
router.get('/', getAllProducts);

// Featured products (homepage)
router.get('/featured', getFeaturedProducts);

// Category pages
router.get('/category/:category', getProductsByCategory);

// Recommendations
router.get('/recommendations', getRecommendedProducts);

/* ===========================
   ADMIN ROUTES (PROTECTED)
   =========================== */

router.post('/', protectRoute, adminRoute, createProduct);
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

export default router;
