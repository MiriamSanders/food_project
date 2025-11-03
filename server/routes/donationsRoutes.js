import express from "express";
import {
  getDonations,
  claimDonation,
  createDonation,
  getDonorDonations,
  getVolunteerDonations
} from "../controllers/donationsController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDonations);

router.put("/:id/claim", authenticateToken, claimDonation);

router.post("/", createDonation);

router.get("/my-donations", authenticateToken, getDonorDonations);
router.get("/my-claims", authenticateToken, getVolunteerDonations);

export default router;
