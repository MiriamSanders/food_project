// testDonationInsert.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Import your Donation model
import Donation from "../models/donation.js"; // adjust path if needed

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Connection error:", err));

// Create a test donation document
async function testDonationInsert() {
  try {
    const donation = new Donation({
      name: "Community Center Donation",
      address: "123 Main St, Jerusalem",
      items: [
        { food: "Rice", amount: 10, unit: "kg" },
        { food: "Chicken", amount: 5, unit: "kg" }
      ],
      maxTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      status: "pending" // optional, defaults to pending
    });

    console.log("Donation to insert:", donation);

    const saved = await donation.save();
    console.log("Donation inserted successfully!");
    console.log(saved);

    process.exit(0);
  } catch (err) {
    console.error("Insert error:", err);
    process.exit(1);
  }
}

testDonationInsert();
