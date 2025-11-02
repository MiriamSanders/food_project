import Donation from "../models/donation.js";

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
    const { name, address, items, maxTime } = req.body || {};

    if (!name || !address || !Array.isArray(items) || items.length === 0 || !maxTime) {
      return res.status(400).json({
        message:
          "Missing required fields: name, address, items (array), maxTime",
      });
    }

    const parsedMaxTime = new Date(maxTime);
    if (isNaN(parsedMaxTime.getTime()))
      return res.status(400).json({ message: "Invalid maxTime date" });

    const donation = new Donation({ name, address, items, maxTime: parsedMaxTime });
    await donation.save();

    io.emit("donationCreated", donation);

    res.status(201).json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const claimDonation = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findById(id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.status = "claimed";
    await donation.save();

    io.emit("donationUpdated", donation);

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
