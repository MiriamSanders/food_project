import express from "express";
import {createDonation} from "../controller/donationController.js";

const router = express.Router();

router.post("/", createDonation);
export default router;
