import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import config from './config/env.js';
import errorHandler from './middleware/errorHandler.js';
import ApiResponse from './utils/apiResponse.js';

// Route Imports
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging Middleware
if (config.nodeEnv !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Request Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Base Route / Health Check
app.get('/health', (req, res) => {
  return ApiResponse.success(res, { uptime: process.uptime() }, 'HydraFlow API Server is healthy');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Catch-all 404 handler
app.use('*', (req, res) => {
  return ApiResponse.notFound(res, `Route '${req.originalUrl}' not found`);
});

// Global Error Handler
app.use(errorHandler);

export default app;
