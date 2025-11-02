// models/donation.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    trim: true
  }
});

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  items: {
    type: [itemSchema],
    required: true,
    validate: v => Array.isArray(v) && v.length > 0
  },
  maxTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "claimed", "completed", "expired"],
    default: "pending"
  }
}, {
  timestamps: true
});

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;