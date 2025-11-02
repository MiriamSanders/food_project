// Route registry - use ESM exports to match server's ESM (package.json "type": "module")
import donationRoutes from "./donationRoutes.js"; // or "./donations.js", pick one
import userRoutes from "./userRoute.js";
// import volunteerRoutes from "./volunteerRoutes.js";

export default function routesInit(app) {
  // Register API route prefixes
  app.use("/users", userRoutes);
  app.use("/donations", donationRoutes); // or "donations" if you use that import

  // app.use('/volunteers', volunteerRoutes);
}
