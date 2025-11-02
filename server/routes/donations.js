import express from "express";
import { getDonations, claimDonation } from "../controllers/donationsController.js";

const router = express.Router();

// GET /api/donations
router.get("/", getDonations);

// PUT /api/donations/:id/claim
router.put("/:id/claim", claimDonation);

export default router;