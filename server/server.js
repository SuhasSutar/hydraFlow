import http from 'http';
import app from './src/app.js';
import config from './src/config/env.js';
import prisma, { connectDB } from './src/config/db.js';
import { Server } from 'socket.io';

const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: config.clientUrl,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Basic WebSocket handlers
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`👤 Client ${socket.id} joined room: ${room}`);
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`👤 Client ${socket.id} left room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// Attach io to global process context or export it for services
global.io = io;

// Start Server
const startServer = async () => {
  // Connect to DB
  await connectDB();

  server.listen(config.port, () => {
    console.log(`🚀 HydraFlow API running on port ${config.port} in ${config.nodeEnv} mode`);
  });
};

startServer();
