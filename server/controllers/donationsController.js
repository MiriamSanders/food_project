import Donation from "../models/Donation.js";

let io;

export const setSocket = (socketIo) => {
  io = socketIo;
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
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

    donation.status = "Claimed by someone";
    await donation.save();

    io.emit("donationClaimed", donation);

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
