import ApiResponse from '../utils/apiResponse.js';

/**
 * Request validation middleware factory
 * Usage: validate(schema) or validate(schema, 'query')
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return ApiResponse.badRequest(res, 'Validation Error', errors);
    }

    // Replace with validated & sanitized values
    req[property] = value;
    next();
  };
};

export default validate;
