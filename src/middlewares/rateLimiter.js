import rateLimit from 'express-rate-limit';
import { config } from '../config/config.js';

export const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      status: 429,
      message: 'Too many requests from this IP, please try again later.'
    }
  }
});
