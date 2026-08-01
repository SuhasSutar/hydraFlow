import jwt from 'jsonwebtoken';
import config from '../config/env.js';
import prisma from '../config/db.js';
import ApiResponse from '../utils/apiResponse.js';

// Select fields to exclude secrets
const selectFields = {
  id: true,
  companyId: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  role: true,
  avatarUrl: true,
  isVerified: true,
  isActive: true,
  lastLoginAt: true,
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: true,
  createdAt: true,
  updatedAt: true,
};

/**
 * JWT Authentication Middleware
 * Verifies access token and attaches user to request
 */
export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized(res, 'No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Get user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: selectFields,
    });

    if (!user) {
      return ApiResponse.unauthorized(res, 'User not found');
    }

    if (!user.isActive) {
      return ApiResponse.unauthorized(res, 'Account is deactivated');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.unauthorized(res, 'Token expired');
    }
    return ApiResponse.unauthorized(res, 'Invalid token');
  }
};

/**
 * Optional auth — doesn't fail if no token, just doesn't attach user
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: selectFields,
      });
    }
  } catch (error) {
    // Silently continue without user
  }
  next();
};

export default auth;
