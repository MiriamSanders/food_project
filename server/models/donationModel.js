import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    hallName: { type: String, required: true },
    address: { type: String, required: true },
    foodType: { type: String, required: true },
    quantity: { type: String, required: true },
    status: { type: String, default: "Available" },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", DonationSchema);

export default Donation;
