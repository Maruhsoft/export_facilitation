const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Load env vars based on environment
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// --- Mount Routers ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/trades', require('./routes/tradeRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/contracts', require('./routes/contractRoutes'));
app.use('/api/escrow', require('./routes/escrowRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/shipments', require('./routes/shipmentRoutes'));
app.use('/api/disputes', require('./routes/disputeRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/system', require('./routes/systemRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// --- API Documentation ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use centralized error handler
app.use(errorHandler);


const PORT = process.env.PORT || 5001;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// --- WebSocket (Socket.IO) Integration ---
// const io = require('socket.io')(server, { cors: { origin: '*' } });
// io.on('connection', socket => {
//   console.log('New client connected');
//   // Handle WebSocket events here
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });

// --- Background Job Queue (BullMQ / Agenda) ---
// const { startJobQueue } = require('./jobs/queue');
// startJobQueue();


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
