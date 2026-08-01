import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';
import config from '../config/env.js';
import ApiResponse from '../utils/apiResponse.js';

// Helper to generate access and refresh tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role, companyId: user.companyId },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn }
  );

  return { accessToken, refreshToken };
};

// Set refresh token in HTTP-only cookie
const setRefreshTokenCookie = (res, token) => {
  const days = parseInt(config.jwt.refreshExpiresIn) || 7;
  const maxAge = days * 24 * 60 * 60 * 1000;

  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'strict',
    maxAge,
  });
};

/**
 * Register a new User
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone, role, companyName, companyType } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return ApiResponse.badRequest(res, 'User with this email already exists');
    }

    let companyId = null;

    // If company details are provided, create the company first
    if (companyName && companyType && ['MANUFACTURER_USER', 'DEALER_USER', 'SERVICE_ENGINEER'].includes(role)) {
      const company = await prisma.company.create({
        data: {
          name: companyName,
          type: companyType,
        },
      });
      companyId = company.id;
    }

    // Hash password manually (since Prisma has no pre-save hooks)
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phone,
        role: role || 'CUSTOMER',
        companyId,
      },
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Save refresh token to user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Set cookie & send response
    setRefreshTokenCookie(res, refreshToken);

    const userResponse = { ...updatedUser };
    delete userResponse.passwordHash;
    delete userResponse.refreshToken;

    return ApiResponse.created(
      res,
      { user: userResponse, accessToken },
      'User registered successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Login User
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.badRequest(res, 'Email and password are required');
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return ApiResponse.unauthorized(res, 'Invalid credentials');
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return ApiResponse.unauthorized(res, 'Invalid credentials');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Save refresh token
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Set cookie & respond
    setRefreshTokenCookie(res, refreshToken);

    const userResponse = { ...updatedUser };
    delete userResponse.passwordHash;
    delete userResponse.refreshToken;

    return ApiResponse.success(
      res,
      { user: userResponse, accessToken },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh Access Token
 */
export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;

    if (!token) {
      return ApiResponse.unauthorized(res, 'Refresh token required');
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.refreshSecret);

    // Find user
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || user.refreshToken !== token || !user.isActive) {
      return ApiResponse.unauthorized(res, 'Invalid refresh token');
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Save new refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // Set cookie & respond
    setRefreshTokenCookie(res, newRefreshToken);

    return ApiResponse.success(
      res,
      { accessToken },
      'Token refreshed successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Logout User
 */
export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;

    if (token) {
      // Clear refresh token from user database
      await prisma.user.updateMany({
        where: { refreshToken: token },
        data: { refreshToken: null },
      });
    }

    // Clear cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
    });

    return ApiResponse.success(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
export const getMe = async (req, res, next) => {
  try {
    // req.user is already populated by auth middleware
    return ApiResponse.success(res, { user: req.user });
  } catch (error) {
    next(error);
  }
};

/**
 * Mock Forgot Password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return ApiResponse.success(res, null, 'If account exists, reset email has been sent');
    }

    // Generate random reset code
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
      },
    });

    console.log(`[EMAIL SEND] Reset token for ${email}: ${resetToken}`);

    return ApiResponse.success(res, null, 'Reset code sent successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Mock Reset Password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
        passwordResetToken: code,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return ApiResponse.badRequest(res, 'Invalid or expired reset code');
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
        refreshToken: null, // Invalidate current sessions
      },
    });

    return ApiResponse.success(res, null, 'Password reset successfully');
  } catch (error) {
    next(error);
  }
};
