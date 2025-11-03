import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./config/db.js";
import routesInit from "./routes/config_routes.js";
import * as donationsController from "./controllers/donationsController.js";

import { startCronJobs } from "./cronJobs.js";
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, { cors: { origin: "*" } });
donationsController.setSocket(io);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: ["text/plain", "text/*"] }));

// Handle stringified JSON
app.use((req, res, next) => {
  if (typeof req.body === "string") {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      // leave as string if not valid JSON
    }
  }
  next();
});

const start = async () => {
  try {
    await connectDB();
    // Register routes
    routesInit(app);
    // Start server
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server due to DB connection error", err);
    process.exit(1);
  }
};

start();
