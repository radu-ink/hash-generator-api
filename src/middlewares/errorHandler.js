import { config } from '../config/config.js';

export function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  const response = {
    success: false,
    error: {
      status: statusCode,
      message: message
    }
  };

  if (config.nodeEnv === 'development') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
}
