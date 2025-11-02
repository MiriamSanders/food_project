import userRoutes from "./userRoutes.js";
import donationRoutes from "./donationRoutes.js";
import volunteerRoutes from "./volunteerRoutes.js";

exports.routesInit = (app) => {
  app.use("./users", userRoutes);
  app.use("./donations", donationRoutes);
  app.use("./volunteers", volunteerRoutes);
};
