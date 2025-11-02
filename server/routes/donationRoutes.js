import express from "express";
import { getDonations, claimDonation, createDonation } from "../controllers/donationsController.js";

const router = express.Router();

router.get("/", getDonations);

router.put("/:id/claim", claimDonation);

router.post("/", createDonation);

export default router;