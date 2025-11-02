// Route registry
import donations from "./donations.js";
// import userRoutes from "./userRoutes.js";
// import volunteerRoutes from "./volunteerRoutes.js";

export default function routesInit(app) {
  // app.use('/users', userRoutes);
  app.use("/donations", donations);
  // app.use('/volunteers', volunteerRoutes);
}
