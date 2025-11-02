// import userRoutes from "./userRoutes.js";
import donationRoutes from "./donations.js";
// import volunteerRoutes from "./volunteerRoutes.js";

export const routesInit = (app) => {
  // app.use("/users", userRoutes);
  app.use("/donations", donationRoutes);
  // app.use("/volunteers", volunteerRoutes);
};
