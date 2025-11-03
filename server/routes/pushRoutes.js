import express from "express";
import { saveSubscription } from "../utils/pushNotifier.js";

const router = express.Router();

router.get("/vapidPublicKey", (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

router.post("/subscribe", (req, res) => {
  saveSubscription(req.body);
  res.status(201).json({ message: "Subscription saved" });
});

export default router;
