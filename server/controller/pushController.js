import pushService from "../utils/pushService.js";

// In-memory store for subscriptions (for production, persist in DB)
const subscriptions = new Set();

export const subscribe = async (req, res) => {
  try {
    // Support cases where body was parsed as text; try to coerce to object
    let subscription = req.body;
    if (typeof subscription === "string") {
      try {
        subscription = JSON.parse(subscription);
      } catch (err) {
        console.warn("subscribe: request body is string but not valid JSON");
      }
    }

    console.log(
      "subscribe headers:",
      req.headers && req.headers["content-type"]
    );
    console.log(
      "subscribe body preview:",
      typeof subscription === "object"
        ? Object.keys(subscription).slice(0, 5)
        : typeof subscription
    );

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ message: "Invalid subscription object" });
    }

    // Use endpoint as a unique key
    subscriptions.add(JSON.stringify(subscription));
    console.log("New subscription stored. Total:", subscriptions.size);
    res.status(201).json({ message: "Subscription saved" });
  } catch (err) {
    console.error("Subscribe error:", err);
    res.status(500).json({ message: "Failed to save subscription" });
  }
};

export const getVapidKey = (req, res) => {
  const key = pushService.getPublicVapidKey();
  if (!key) {
    return res
      .status(500)
      .json({ message: "VAPID public key not configured on server" });
  }
  res.json({ publicKey: key });
};

export const sendToAll = async (req, res) => {
  try {
    const payload = req.body || {
      title: "Notification",
      body: "You have a new notification",
    };
    const results = [];
    for (const subStr of subscriptions) {
      const subscription = JSON.parse(subStr);
      // sendNotification returns {success: true} or {success:false, error}
      // await to avoid flooding
      // eslint-disable-next-line no-await-in-loop
      const r = await pushService.sendNotification(subscription, payload);
      results.push({ endpoint: subscription.endpoint, ...r });
    }
    res.json({ results });
  } catch (err) {
    console.error("Error sending notifications:", err);
    res
      .status(500)
      .json({ message: "Failed to send notifications", error: err.message });
  }
};

export default { subscribe, sendToAll, getVapidKey };
