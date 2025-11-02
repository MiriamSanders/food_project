import Donation from "../models/donationModel.js";

let io;

export const setSocket = (socketIo) => {
  io = socketIo;
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createDonation = async (req, res) => {
  try {
    console.log(
      "Request Content-Type:",
      req.headers && req.headers["content-type"]
    );
    console.log("Request Body:", req.body);

    // Basic validation before trying to construct a Mongoose model so we return clearer errors
    const { name, address, items, maxTime } = req.body || {};

    if (
      !name ||
      !address ||
      !maxTime ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message:
          "Missing required fields. Required: name (string), address (string), maxTime (date/string), items (non-empty array)",
      });
    }

    // Coerce maxTime to Date if needed
    const parsedMaxTime = maxTime instanceof Date ? maxTime : new Date(maxTime);
    if (isNaN(parsedMaxTime.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid maxTime value; must be a valid date." });
    }

    const donationData = { name, address, items, maxTime: parsedMaxTime };

    const donation = new Donation(donationData);
    console.log("Donation document to save:", donation);
    await donation.save();
     if (io) io.emit("donationCreated", donation);
    res.status(201).json(donation);
  } catch (err) {
    console.log("Error creating donation:", err);
    // Return Mongoose validation details when available
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message, errors: err.errors });
    }
    res.status(500).json({ message: err.message });
  }
};

export const claimDonation = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    
    const donation = await Donation.findById(id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.status = "claimed";
    console.log(donation);
    await donation.save();

    if (io) io.emit("donationUpdated", donation);

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
