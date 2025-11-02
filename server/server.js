import express from "express";
import cors from "cors";
import routesInit from "./routes/config_routes.js";
import connectDB from "./config/db.js";
import { startCronJobs } from "./cronJobs.js";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Also accept plain/text bodies and attempt to coerce JSON when the client sent
// JSON with Content-Type: text/plain (some clients/tools do this).
app.use(express.text({ type: ['text/plain', 'text/*'] }));
app.use((req, res, next) => {
  // If body is a string, try to parse JSON out of it. If parse fails, leave as-is.
  if (typeof req.body === 'string') {
    try {
      const parsed = JSON.parse(req.body);
      req.body = parsed;
    } catch (e) {
      // not JSON — leave req.body as the raw string
    }
  }
  next();
});
// Start server after DB connection is established
const start = async () => {
  try {
    await connectDB();
    // Register routes after DB is ready
    startCronJobs();
    routesInit(app);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server due to DB connection error');
    process.exit(1);
  }
};

start();
