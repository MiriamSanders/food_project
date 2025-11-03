import express from "express";
import {
  getDonations,
  claimDonation,
  createDonation,
//   getDonorDonations,
//   getVolunteerDonations,
  getUserDonations
} from "../controllers/donationsController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDonations);

router.put("/:id/claim", authenticateToken, claimDonation);

router.post("/", createDonation);

// router.get("/my-donations", authenticateToken, getDonorDonations);
router.get("/my-donations", authenticateToken, getUserDonations);

// router.get("/my-claims", authenticateToken, getVolunteerDonations);
router.get("/my-claims", authenticateToken, getUserDonations);

export default router;
