import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    // Allow roles used by the client (donor/volunteer) as well as default user/admin
    role: { type: String, enum: ["user", "admin", "donor", "volunteer"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
