import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./config/db.js";
import { routesInit } from "./routes/config_routes.js";
import * as donationsController from "./controllers/donationsController.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, { cors: { origin: "*" } });
donationsController.setSocket(io);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
routesInit(app);

// MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
