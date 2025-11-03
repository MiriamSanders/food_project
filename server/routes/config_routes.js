import donationsRoutes from "./donationsRoutes.js";
import userRoutes from "./userRoute.js";
// import volunteerRoutes from "./volunteerRoutes.js";

export default function routesInit(app) {
  // Register API route prefixes
  app.use("/users", userRoutes);
  app.use("/donations", donationsRoutes); // or "donations" if you use that import
  // app.use('/volunteers', volunteerRoutes);
}
