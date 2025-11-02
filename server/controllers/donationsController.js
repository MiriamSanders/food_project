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
    const { hallName, address, foodType, quantity } = req.body || {};

    // בדיקה של השדות הנדרשים
    if (!hallName || !address || !foodType || !quantity) {
      return res.status(400).json({
        message: "Missing required fields: hallName, address, foodType, quantity",
      });
    }

    const donation = new Donation({ hallName, address, foodType, quantity });
    await donation.save();

    // שידור אירוע דרך Socket.IO
    if (io) io.emit("donationCreated", donation);

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

    if (io) io.emit("donationUpdated", donation);

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
