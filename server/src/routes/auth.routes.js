import express from 'express';
import Joi from 'joi';
import { login, register, refreshToken, logout, getMe, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';

const router = express.Router();

// Joi Schemas for Validation
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().allow(''),
  role: Joi.string().valid(
    'SUPER_ADMIN',
    'ADMIN',
    'MANUFACTURER_USER',
    'DEALER_USER',
    'SERVICE_ENGINEER',
    'CUSTOMER'
  ),
  companyName: Joi.string().when('role', {
    is: Joi.string().valid('MANUFACTURER_USER', 'DEALER_USER', 'SERVICE_ENGINEER'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  companyType: Joi.string().valid('MANUFACTURER', 'DEALER', 'SERVICE_PROVIDER').when('role', {
    is: Joi.string().valid('MANUFACTURER_USER', 'DEALER_USER', 'SERVICE_ENGINEER'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

// Routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.get('/me', auth, getMe);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default router;
