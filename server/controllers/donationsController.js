import Donation from "../models/donationModel.js";
import { getDistance } from "geolib";
import fetch from "node-fetch";
let io;

export const setSocket = (socketIo) => {
  io = socketIo;
};

export const getDonations = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: "Missing coordinates" });

    const donations = await Donation.find({
      status: { $nin: ["expired", "claimed"] } // exclude both expired and claimed
    }).sort({ createdAt: -1 });

    console.log(donations);

    // const filtered = [];
    // for (let donation of donations) {
    //   // Geocode the donation address (example using Nominatim)
    //   const geoRes = await fetch(
    //     `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    //       donation.address
    //     )}&format=json&limit=1`
    //   );
    //   const geoData = await geoRes.json();
    //   if (!geoData[0]) continue;

    //   const donationLat = parseFloat(geoData[0].lat);
    //   const donationLng = parseFloat(geoData[0].lon);

    //   const distance = getDistance(
    //     { latitude: parseFloat(lat), longitude: parseFloat(lng) },
    //     { latitude: donationLat, longitude: donationLng }
    //   );
    //   console.log(distance);
    //   if (distance <= 15000) filtered.push(donation); // 15 km
    // }
    // console.log(filtered);

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
