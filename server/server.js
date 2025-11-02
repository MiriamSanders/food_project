import express from 'express';
import cors from 'cors';
import routesInit from './routes/config_routes.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
routesInit(app);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
