import { Router } from 'express';
import { auth } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/rbac.middleware.js';
import {
  listProductModels,
  getProductModel,
  createProductModel,
  updateProductModel,
  deleteProductModel,
  listCategories,
} from '../controllers/product.controller.js';

const router = Router();

// All product routes require authentication
router.use(auth);

// Categories — any authenticated user can list
router.get('/categories', listCategories);

// Product Models — CRUD
router.get('/models', listProductModels);
router.get('/models/:id', getProductModel);

// Only manufacturer users, admins, and super admins can create/update/delete
router.post(
  '/models',
  authorize('MANUFACTURER_USER', 'ADMIN', 'SUPER_ADMIN'),
  createProductModel
);

router.put(
  '/models/:id',
  authorize('MANUFACTURER_USER', 'ADMIN', 'SUPER_ADMIN'),
  updateProductModel
);

router.delete(
  '/models/:id',
  authorize('MANUFACTURER_USER', 'ADMIN', 'SUPER_ADMIN'),
  deleteProductModel
);

export default router;
