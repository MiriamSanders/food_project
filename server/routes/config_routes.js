import userRoute from "./userRoute.js";
// import donationRoutes from "./donationRoutes.js";
// import volunteerRoutes from "./volunteerRoutes.js";

export default function routesInit(app) {
  app.use("/users", userRoute);
  // app.use("/donations", donationRoutes);
  // app.use("/volunteers", volunteerRoutes);
}

