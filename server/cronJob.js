import cron from "node-cron";
import Donation from "./models/Donation.js"; // adjust path as needed

export const startCronJobs = () => {
  // Run every hour
  cron.schedule("0 * * * *", async () => {
    try {
      const now = new Date();
      const result = await Donation.updateMany(
        { maxTime: { $lt: now }, status: { $ne: "expired" } },
        { $set: { status: "expired" } }
      );
      console.log(`Marked ${result.modifiedCount} donations as expired`);
    } catch (err) {
      console.error("Error running cron job:", err);
    }
  });

  console.log("Cron jobs started");
};
