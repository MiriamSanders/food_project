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
    if (!lat || !lng)
      return res.status(400).json({ message: "Missing coordinates" });

    const donations = await Donation.find({

      status: { $nin: ["expired", "claimed"] },
    }).sort({ createdAt: -1 });

    const filtered = [];

    for (let donation of donations) {
      try {
        const geoRes = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
            donation.address
          )}&format=json&limit=1&apiKey=${process.env.GEOAPIFY_KEY}`
        );

        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results || !geoData.results[0]) continue;

        const donationLat = parseFloat(geoData.results[0].lat);
        const donationLng = parseFloat(geoData.results[0].lon);

        const distance = getDistance(
          { latitude: parseFloat(lat), longitude: parseFloat(lng) },
          { latitude: donationLat, longitude: donationLng }
        );

        console.log("distance:", distance);

        if (distance < 20000) filtered.push(donation);
      } catch (err) {
        console.warn("Skipping donation due to error:", donation.address, err.message);
      }
    }
    console.log(filtered);

    res.json(filtered);
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
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message, errors: err.errors });
    }
    res.status(500).json({ message: err.message });
  }
};

export const claimDonation = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findById(id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });
    const { id: volunteerId, name: volunteerName } = req.user;

    if (donation.status !== "pending")
      return res
        .status(400)
        .json({ message: "Donation already claimed or completed" });

    donation.status = "claimed";
    donation.volunteerId = volunteerId;
    donation.volunteerName = volunteerName;

    await donation.save();
    io.emit("donationClaimed", donation);

    if (io) {
      io.emit("donationUpdated", {
        _id: donation._id,
        status: donation.status,
        volunteerId: donation.volunteerId,
      });
    }

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// export const getDonorDonations = async (req, res) => {
//   try {
//     const donorId = req.user.id;
//     const donations = await Donation.find({ userId: donorId });
    
//     res.json(donations);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const getVolunteerDonations = async (req, res) => {
//   try {
//     const volunteerId = req.user.id;    
//     const donations = await Donation.find({ volunteerId });    
//     res.json(donations);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
export const getUserDonations = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let donations;
    if (role === "donor") {
      donations = await Donation.find({ donorId: userId });
    } else if (role === "volunteer") {
      donations = await Donation.find({ volunteerId: userId });
    } else {
      return res.status(403).json({ message: "Role not allowed" });
    }

    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
