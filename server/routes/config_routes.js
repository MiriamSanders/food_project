// Route registry
import donationRoutes from "./donationRoutes.js";
// import userRoutes from "./userRoutes.js";
// import volunteerRoutes from "./volunteerRoutes.js";

export default function routesInit(app) {
  // Register API route prefixes
  // app.use('/users', userRoutes);
  app.use("/donations", donationRoutes);
  // app.use('/volunteers', volunteerRoutes);
}
