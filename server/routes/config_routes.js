// Route registry - use ESM exports to match server's ESM (package.json "type": "module")
import donationRoutes from "./donationRoutes.js";
import pushRoutes from "./pushRoutes.js";
// import userRoutes from "./userRoutes.js";
// import volunteerRoutes from "./volunteerRoutes.js";

export default function routesInit(app) {
  // Register API route prefixes. Use leading slash for paths.
  // app.use('/users', userRoutes);
  app.use("/donations", donationRoutes);
  app.use("/push", pushRoutes);
  // app.use('/volunteers', volunteerRoutes);
}
