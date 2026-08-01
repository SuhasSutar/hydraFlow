import ApiResponse from '../utils/apiResponse.js';

/**
 * Role-Based Access Control Middleware
 * Usage: authorize('ADMIN', 'MANUFACTURER_USER')
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return ApiResponse.forbidden(
        res,
        `Role '${req.user.role}' is not authorized to access this resource`
      );
    }

    next();
  };
};

/**
 * Check if user belongs to the specified company
 * Usage: authorizeCompany() — checks req.params.companyId against user's company
 */
export const authorizeCompany = () => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res);
    }

    // Super admins and admins can access any company
    if (['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)) {
      return next();
    }

    const companyId = req.params.companyId || req.body.companyId;
    if (companyId && req.user.companyId?.toString() !== companyId) {
      return ApiResponse.forbidden(res, 'You can only access your own company data');
    }

    next();
  };
};

/**
 * Check if user is the resource owner or has admin privileges
 */
export const authorizeOwnerOrAdmin = (getOwnerId) => {
  return async (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res);
    }

    if (['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)) {
      return next();
    }

    try {
      const ownerId = await getOwnerId(req);
      if (ownerId?.toString() !== req.user._id.toString()) {
        return ApiResponse.forbidden(res, 'You can only access your own resources');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorize;
