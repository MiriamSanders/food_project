import express from "express";
import {
  subscribe,
  sendToAll,
  getVapidKey,
} from "../controller/pushController.js";

const router = express.Router();

// Save subscription from client
router.post("/subscribe", subscribe);

// Return public VAPID key to client
router.get("/vapidPublicKey", getVapidKey);

// Trigger sending a notification to all saved subscriptions (for testing/admin)
router.post("/send", sendToAll);

export default router;
